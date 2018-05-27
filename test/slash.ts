import FormData from 'form-data';
import fetch from 'node-fetch';

export default function Slash(url: string) {
  return function(command: string, user: string = 'TestUser') {
    const formData = new FormData(null);
    formData.append('user_name', user);

    const options = {
      method: 'POST',
      body: formData
    };
    return fetch(url, options).then(res => res.json());
  };
}
