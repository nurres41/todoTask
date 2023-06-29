
# To-Do App


In this to-do application;

Users can add new things to be done, see and update the things they have added. It can also mark the completed tasks as finished.
## API Use

#### Get all data

```http
  GET /api/items
```

| Type    |
| :------- | 
| `string` |

#### Get update data

```http
  PUT /api/item/:id
```

| Parameter |
| :-------- |
| `id`      | 

#### Delete update data

```http
  DELETE /api/item/:id
```

| Parameter |
| :-------- |
| `id`      | 


#### Add data

```http
  POST /api/item
```

| Type    |
| :------- | 
| `Object` | 


#### Done data

```http
  PUT /api/item
```
| Parameter |
| :-------- |
| `id`      | 


#### Get Life Tag Data

```http
  GET /api/items/life
```
| Type    |
| :------- | 
| `Array` | 




  
## Used Technology

**İstemci:** React, TailwindCSS

**Sunucu:** NodeJs, Express

**Database:** MongoDB

  
