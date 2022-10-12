import Head from 'next/head';
import { APP_DESCRIPTION, APP_NAME, APP_URL } from '../config/constants';

const AppHead: React.FC<any> = () => (
  <Head>
    <title>Polls</title>
    {/* <link
          href="https://fonts.googleapis.com/css2?family=Inter&display=optional"
          rel="stylesheet"
    /> */}
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="title" content={APP_NAME} />
    <meta name="description" content={APP_DESCRIPTION} />
    <meta name="theme-color" content="#000" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content={APP_URL} />
    <meta property="og:title" content={APP_NAME} />
    <meta property="og:description" content={APP_DESCRIPTION} />
    <meta property="og:image" content="img/template.png" />

    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content={APP_URL} />
    <meta property="twitter:title" content={APP_NAME} />
    <meta property="twitter:description" content={APP_DESCRIPTION} />
    <meta property="twitter:image" content="img/template.png" />
    <link rel="icon" href="/svg/logo.svg" />
  </Head>
);

export default AppHead;
