
const pageHome = () => System.import('./pages/Home');


const pageWebView = () => System.import('./pages/WebView');

export default [

    { path: '/', component: pageHome},
    {name:'pageHome', path: '/pageHome', component: pageHome},

    {name:'pageWebView', path: '/pageWebView', component: pageWebView},
]