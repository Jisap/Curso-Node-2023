import request from 'supertest'
import { testServer } from '../../test-server';
import { prisma } from '../../../src/data/postgres/index';



describe('Todo route testing', () => { 

  beforeAll(async() => {
    await testServer.start()
  });
  
  afterAll(() => {
    testServer.close();
  });

  beforeEach(async() => {
    await prisma.todo.deleteMany();
  })

  const todo1 = { text: "Hola mundo 1" };
  const todo2 = { text: "Hola mundo 2" };

  test('should return the TODOs api/todos', async() => {
     
    await prisma.todo.createMany({
      data: [ todo1, todo2 ]
    })

    const { body } = await request(testServer.app)
      .get('/api/todos')
      .expect(200)

    expect( body ).toBeInstanceOf( Array )
    expect( body.length ).toBe(2)
    expect( body[0].text).toBe( todo1.text )
    expect( body[1].text).toBe( todo2.text )
    expect( body[0].completedAt ).toBeNull()

    console.log(body)

  });

  test('Should return a TODO api/todos/:id', async() => {
    
    const newTodo = await prisma.todo.create({ data: todo1 });

    const { body } = await request(testServer.app)
      .get(`/api/todos/${newTodo.id}`)
      .expect(200);

    expect(body).toEqual({
      id: newTodo.id,
      text: newTodo.text,
      completedAt: newTodo.completedAt
    });
  });
  
  test('Should return 404 if TODO is not found', async () => {
  
    const todoId = 9999
    const { body } = await request(testServer.app)
      .get(`/api/todos/${todoId}`)
      .expect(400)

    expect(body).toEqual({ error: `Todo with id ${todoId} not found` })
  })

  test('should return a new Todo api/todos', async() => {
    
    const { body } = await request(testServer.app)
      .post(`/api/todos`)
      .send( todo1 )
      .expect(201)

    expect(body).toEqual({
      id: expect.any(Number),
      text: todo1.text,
      completedAt: null,
    })
  });
  
  test('should return an error if text is nor valid api/todos', async () => {

    const { body } = await request(testServer.app)
      .post(`/api/todos`)
      .send({})
      .expect(400)

    expect(body).toEqual({ error: 'Text property is required' })
  });
})