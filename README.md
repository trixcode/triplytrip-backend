**TriplyTrip project API**

__________

_Пержде чем открыть проект убедитесь что у вас есть
все необходимые зависимости_ 

`node`, `mongo` & `yarn`
___
- Проверить node: `node --version` `v10 - v11.10.0`
___
- Проверить yarn: `yarn --version` `v1.16.0`
___
- Проверить mongoDB: `mongo ---version`
`MongoDB shell version v4.0.10`


Если у вас не установлена - node `https://nodejs.org/en/download/`

Или если не установлен - yarn `https://yarnpkg.com/ru/docs/install#debian-stable`

или- mongoDB `https://docs.mongodb.com/manual/installation/`
___
Выполните команду `npm install` или если у вас установлен yarn
`yarn install`.
---
- Надо запустить fixture.js `node fixture.js`.
Что бы загрузить дефолдных юзеров.
И в моделе Users, где добавить роли по дефолту
` roles: {
     type: Schema.Types.ObjectId,
     ref: 'RoleUsers',
     required: true,
     default: '5d01f096f7d721174d5821d8' - здесь ставиться айдишник от 
     RoleUsers так как данный афдишник может не совпадать с тем который 
     сгенерирует вам fixture 
   },`
---
- Если вы сделали все выше перечисленое то попробуйте запустить проект `npm run dev`
& `yarn run dev`
- Для тестирования использовать `npm test` & `yarn test`
- Для building `npm build` & `yarn build`

