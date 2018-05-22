# CTFStrap Backend API Reference

## /api/auth/ : Authentication
### POST /api/auth/login

Login an account to CTF.

#### Parameters
| Name | Type | Description |
| :---: | :---: | :---: |
| `email` | string(email) | **Required.** Email of the account |
| `password` | string | **Required.** Password pof the account |

#### Example
Request
```json
{
    "email": "example@example.com",
    "password": "password"
}
```
Response
```json
{
    "_id": "1c60682fc7594c63ec3700b0"
    "username": "ExampleAccount"
}
```

### GET /api/auth/logout

Logout the current account.

#### Parameters
No parameters in need.

### GET /api/auth/register

Register an account to CTF.

#### Parameters
| Name | Type | Description |
| :---: | :---: | :---: |
| `username` | string | **Required.** Username that will be displayed to the scoreboard |
| `email` | string(email) | **Required.** Email of the account |
| `password` | string(length: 6~30) | **Required.** Password of the account |

#### Example
Request
```json
{
	"username": "ExampleAccount",
	"email": "exmaple@example.com",
	"password": "password"
}
```
Response
```json
{
    "_id": "1c60682fc7594c63ec3700b0"
    "username": "ExampleAccount"
}
```

## /api/chall : Challenge

### POST /api/chall/create

Create a challenge.

### DELETE /api/chall/delete

Delete the challenge.

### POST /api/chall/auth

Auth the challenge (can be various not only flag).

### GET /api/chall/list

List the challenge with filter or order.

### GET /api/chall/info

Get Info(Solvers count, Title, Description, etc...)
