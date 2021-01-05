# Investment Game 2021

## TODO

### `Sign Up`
Email을 통해 회원가입한다.
<ul>
<li>Email 인증이 필요</li>
<li>Email이 아싳 계정이면 Admin 계정으로 간주</li>
<li>랜덤으로 인증번호를 만들어서 Email로 보내자. 받은 인증번호로 인증하자</li>
</ul>

### `Firebase`
<h3>Structure</h3>
<ul>
<li>
users
    <ul>
    <li>uid
        <ul>
        <li>asset</li>
        <li>email</li>
        <li>reward</li>
        <li>username</li>
        <li>checked(selected company)</li>
        </ul>
    </li>
    </ul>
</li>
</ul>

### `Game`
<h3>Video</h3>
<ul>
<li>서버에서 전체 진행 시간 관리</li>
<li>그 시간에 맞게 영상 현재 시간 설정</li>
</ul>
<h3>Game</h3>
<ul>
<li>현재 시간에 따라 맞는 페이지 보여주도록
    <ul>
    <li>xx:xx~yy:yy동안엔 GameNav.js에서 Round1.js를 띄우고...
    </ul>
</li>
</ul>

### `Company`
<h3>failround</h3>
<ul>
<li>탈락한 라운드를 말한다.</li>
<li>0일 경우 아직 탈락하지 않았다는 뜻임.</li>
</ul>

### `Hosting`

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
