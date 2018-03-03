# Node.JS API Basic 101

1. Authentication using JsonWebToken (JWT)
2. Create, Read, Update, Delete using Express

API Guide

-- Authentication --
1. Get token : POST on https://fierce-waters-66272.herokuapp.com/api/auth with body 

{
	"username": "ayus"
}

2. Verification : GET on https://fierce-waters-66272.herokuapp.com/api/auth/verify with header

token get from API /api/auth

-- CRUD -- 
* Must have token from API Auth inside header *
1. Create : POST on https://fierce-waters-66272.herokuapp.com/api/bears with body

{
	"bear_name": "Panda"
}

2. Read All : GET on https://fierce-waters-66272.herokuapp.com/api/bears

3. Read by Id : GET on https://fierce-waters-66272.herokuapp.com/api/bears/:bear_id

bear_id get from API /api/bears
e.g : https://fierce-waters-66272.herokuapp.com/api/bears/5a9a7a53084b0700147451fc

4. Update by Id : PUT on https://fierce-waters-66272.herokuapp.com/api/bears/:bear_id with body

{
	"bear_name": "Koala"
}
bear_id get from API /api/bears
e.g : https://fierce-waters-66272.herokuapp.com/api/bears/5a9a7a53084b0700147451fc

5. Delete by Id : DELETE on https://fierce-waters-66272.herokuapp.com/api/bears/:bear_id

bear_id get from API /api/bears
e.g : https://fierce-waters-66272.herokuapp.com/api/bears/5a9a7a53084b0700147451fc

