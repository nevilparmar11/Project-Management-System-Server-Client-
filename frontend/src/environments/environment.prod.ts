import { EnvironmentModel } from './environment-model';

/* 
change this api url to the backend api of your project in the production mode
For now, I will test this project using the two simple json files
inside assets/data folder named auth.json and project.json which contains the necessary data for testing and developing purpose
*/

export const environment: EnvironmentModel = {
  production: true,
  apiUrl:  '/assets/data'
};
//'/assets/data'
// 'https://jira-clone-angular-api.herokuapp.com'