import { Request, Response } from "express";



export class TicketController {

  constructor(){}

  public getTickets = async(req:Request, res: Response) => {
    res.json('getTickets')
  }

  public getLastTicketNumber = async (req: Request, res: Response) => {
    res.json('getLastTicketNumber')
  }

  public pendinTickets = async (req: Request, res: Response) => {
    res.json('PendinTickets')
  }

  public createTicket = async (req: Request, res: Response) => {
    res.json('createTicket')
  }

  public drawTicket = async (req: Request, res: Response) => {
    res.json('DrawTicket')
  }

  public ticketFinished = async (req: Request, res: Response) => {
    res.json('ticketFinished')
  }

  public workingOn = async (req: Request, res: Response) => {
    res.json('workingOn')
  }
}
