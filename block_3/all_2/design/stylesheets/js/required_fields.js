/*function validate_form(){

var username = document.form.first_name.value;
var login = document.form.login.value;
var usernameS = document.form.second_name.value;
var email = document.form.email.value;
var phone= document.form.phone.value;
var about = document.form.about.value;
var password = document.form.password.value;
var password2 = document.form.password2.value;
//Если поле name пустое выведем сообщение и предотвратим отправку формы
//document.getElementById(0).onChange(function () {

})
if(username.length ===0){
document.getElementById('namef').innerHTML='<span id="error" style="margin-left:30px;">Ви повинні заповнити поле</span>';
return false;
}else if (! (/^[a-zA-Zа-яА-Я]+$/.test(username))){
  document.getElementById('namef').innerHTML='<span id="error" style="margin-left:300px;">Тільки букви</span>';
  return false;
} else {
  document.getElementById('namef').innerHTML='<span id="ok" >Ok</span>';

}
if(usernameS.length ===0){
document.getElementById('snamef').innerHTML='<span id="error" style="margin-left:30px;">Ви повинні заповнити поле</span>';
return false;
}else if (! (/^[a-zA-Zа-яА-Я]+$/.test(usernameS))){
  document.getElementById('snamef').innerHTML='<span id="error" style="margin-left:300px;">Тільки букви</span>';
  return false;
} else {
  document.getElementById('snamef').innerHTML='<span id="ok" >Ok</span>';

}
if(login.length ===0){
document.getElementById('log').innerHTML='<span id="error" style="margin-left:30px;">Ви повинні заповнити поле</span>';
return false;
} else {
  document.getElementById('log').innerHTML='<span id="ok" >Ok</span>';
}
if(email.length ===0){
document.getElementById('em').innerHTML='<span id="error" style="margin-left:30px;">Ви повинні заповнити поле</span>';
return false;
}else if(! (/^[a-zA-Z0-9_\-\.]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/.test(email))){
document.getElementById('em').innerHTML='<span id="error" style="margin-left:30px;">Неправильний запис email</span>';
return false;
} else {
  document.getElementById('em').innerHTML='<span id="ok" >Ok</span>';
}


//Если поле email пустое выведем сообщение и предотвратим отправку формы
if(password.length === 0){
document.getElementById('passwordF').innerHTML='<span id="error" style="margin-left:30px;">Ви повинні заповнити поле</span>';
return false;
}else if(password.length < 6){
  document.getElementById('passwordF').innerHTML='<span id="error" style="margin-left:30px;">Пароль має мати не менше 6 символів</span>';
return false;
} else {
  document.getElementById('passwordF').innerHTML='<span id="ok" ></span>';
}

if(password2.length === 0){

document.getElementById('passwordF2').innerHTML='<span id="error" style="margin-left:30px;">Введіть пароль повторно</span>';
return false;
}else if(password!=password2){
  document.getElementById('passwordF2').innerHTML='<span id="error" style="margin-left:30px;">Повторний пароль введено неправильно</span>';
  return false;
}else{
   document.getElementById('passwordF2').innerHTML='<span id="ok" ></span>';
  document.getElementById('passwordF').innerHTML='<span id="ok" >Ok</span>';
}
if(phone.length ===0){
document.getElementById('ph').innerHTML='<span id="error" style="margin-left:30px;">Ви повинні заповнити поле</span>';
return false;
}else if(!(/^0[0-9]{9}$/.test(phone))){
document.getElementById('ph').innerHTML='<span id="error" style="margin-left:30px;">Номер має складатися з 9 цифр (починатися з 0)</span>';
return false;
} else {
  document.getElementById('ph').innerHTML='<span id="ok" >Ok</span>';
}
if(about.length ===0){
document.getElementById('ab').innerHTML='<span id="error" style="margin-left:30px;">Ви повинні заповнити поле</span>';
return false;
} else {
  document.getElementById('ab').innerHTML='<span id="ok" >Ok</span>';
}
return true;
}

*/
var name = false;
var surname = false;
var login = false;
var email = false;
var p1 = false;
var p2 = false;
var phone = false;
var about = false;

function validate_formn(){
var username = document.form.first_name.value;
if(username.length == 0){
document.getElementById('namef').innerHTML='<span id="error" style="margin-left:30px;">Ви повинні заповнити поле</span>';
return false;
}else if (! (/^[a-zA-Zа-яА-Я]+$/.test(username))){
	document.getElementById('namef').innerHTML='<span id="error" style="margin-left:300px;">Тільки букви</span>';
	name = false;
	return false;
} else {
	document.getElementById('namef').innerHTML='<span id="ok" >Ok</span>';
	name = true;
	check();
}
return true;

}

function validate_forms(){
	var usernameS = document.form.second_name.value;
	if(usernameS.length == 0){
	document.getElementById('snamef').innerHTML='<span id="error" style="margin-left:30px;">Ви повинні заповнити поле</span>';
	surname = false;
	return false;
	}else if (! (/^[a-zA-Zа-яА-Я]+$/.test(usernameS))){
	  document.getElementById('snamef').innerHTML='<span id="error" style="margin-left:300px;">Тільки букви</span>';
		surname = false;
		return false;
	} else {
	  document.getElementById('snamef').innerHTML='<span id="ok" >Ok</span>';
		surname = true;
	check();

	}
		return true;

}

function validate_forml(){
	var loginV = document.form.login.value;
	if(loginV.length == 0){
	document.getElementById('log').innerHTML='<span id="error" style="margin-left:30px;">Ви повинні заповнити поле</span>';
	login = false;
	return false;
	} else {
	  document.getElementById('log').innerHTML='<span id="ok" >Ok</span>';
		login = true;
	check();
	}
	return true;
}

function validate_forme(){
	var emailV = document.form.email.value;
	if(emailV.length == 0){
	document.getElementById('em').innerHTML='<span id="error" style="margin-left:30px;">Ви повинні заповнити поле</span>';
	email = false;
	return false;
}else if(! (/^[a-zA-Z0-9_\-\.]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/.test(emailV))){
	document.getElementById('em').innerHTML='<span id="error" style="margin-left:30px;">Неправильний запис email</span>';
	email = false;
	return false;
	} else {
	  document.getElementById('em').innerHTML='<span id="ok" >Ok</span>';
		email = true;
		check();
	}
		return true;

}
function validate_formp1(){
	var password = document.form.password.value;
	var password2 = document.form.password2.value;
	if(password.length == 0){
	document.getElementById('passwordF').innerHTML='<span id="error" style="margin-left:30px;">Ви повинні заповнити поле</span>';
	p1 = false;
	return false;
	}else if(password.length < 6){
	  document.getElementById('passwordF').innerHTML='<span id="error" style="margin-left:30px;">Пароль має мати не менше 6 символів</span>';
		p1 = false;
	return false;
	} else {
	  document.getElementById('passwordF').innerHTML='<span id="ok" ></span>';
		p1 = true;
check();
	}


		return true;

}
function validate_formp2(){
	var password = document.form.password.value;
	var password2 = document.form.password2.value;
	if(password2.length == 0){

	document.getElementById('passwordF2').innerHTML='<span id="error" style="margin-left:30px;">Введіть пароль повторно</span>';
p2 = false;
	return false;
	}else if(password!=password2){
	  document.getElementById('passwordF2').innerHTML='<span id="error" style="margin-left:30px;">Повторний пароль введено неправильно</span>';
p2 = false;
		return false;
	}else{
	   document.getElementById('passwordF2').innerHTML='<span id="ok" ></span>';
	  document.getElementById('passwordF').innerHTML='<span id="ok" >Ok</span>';
		p2 = true;
		p1 = true;
check();
	}
	return true;

}
function validate_formph(){
	var phoneV= document.form.phone.value;
	if(phoneV.length == 0){
	document.getElementById('ph').innerHTML='<span id="error" style="margin-left:30px;">Ви повинні заповнити поле</span>';
	phone = false;
	return false;
}else if(!(/^0[0-9]{9}$/.test(phoneV))){
	document.getElementById('ph').innerHTML='<span id="error" style="margin-left:30px;">Номер має складатися з 9 цифр (починатися з 0)</span>';
phone = false;
	return false;
	} else {
	  document.getElementById('ph').innerHTML='<span id="ok" >Ok</span>';
		phone = true;
	check();
	}

	return true;

}

function validate_formab(){
	var aboutV = document.form.about.value;
	if(aboutV.length == 0){
	document.getElementById('ab').innerHTML='<span id="error" style="margin-left:30px;">Ви повинні заповнити поле</span>';
	about = false;
	return false;
	} else {
	  document.getElementById('ab').innerHTML='<span id="ok" >Ok</span>';
		about = true;
check();
	}

return true;

}

function check(){
 if (name && surname && email && p1 && p2 && login && about && phone){

document.getElementById("but").removeAttribute("disabled");
document.getElementById("but").setAttribute("style", "background: #84b732;");
	}
	else
	{
		document.getElementById("but").setAttribute("disabled", true);
document.getElementById("but").setAttribute("style", "background:#9D9F9A;");
	}
	}
