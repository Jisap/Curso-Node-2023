import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";


const notify = async (message: string) => {

  const body = {
    content: message,
    embeds: [
      {
        image: { url: 'https://plus.unsplash.com/premium_photo-1678565869434-c81195861939?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }
      }
    ]
  }

  const resp = await fetch(process.env.DISCORD_WEBHOOK_URL ?? '', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });

  if (!resp.ok) {
    console.log('Error sending message');
    return false
  }

  return true

}

const onStar = (payload: any): string => {
  const { action, sender, repository, starred_at } = payload;
  return `User ${sender.login} ${action} star on ${repository.full_name}`
}

const onIssue = (payload: any): string => {

  const { action, issue } = payload;

  if (action === 'opened') {
    return `An issue was opened with this title ${issue.title}`
  }

  if (action === 'closed') {
    return `An issue was closed by ${issue.user.login}`
  }

  if (action === 'reopened') {
    return `An issue was reopened by ${issue.title}`
  }

  return `Unhandled action for the issue event ${action}`

}

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {

  const githubEvent = event.headers['x-github-event'] ?? 'unknown';
  const payload = JSON.parse(event.body ?? '{}');

  console.log(payload);

  let message: string;

  switch (githubEvent) {
    case 'star':
      message = onStar(payload)
      break;

    case 'issues':
      message = onIssue(payload)
      break

    default:
      message = `Unknown event ${githubEvent}`
  }


  await notify(message)

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'done'
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  }
};

export { handler };