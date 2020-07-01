import { environment } from 'src/environments/environment';
let prefix = './';
if (environment.production) {
  prefix = './components/';
}

export const imageArray = [
  prefix + 'assets/image1.png',
  prefix + 'assets/image2.png',
  prefix + 'assets/image3.png'
];
