import micro from 'micro';
import slash from './slash';
import notification from './notification';

micro(slash()).listen(3000);
micro(notification('SLACK_URL')).listen(3001);
