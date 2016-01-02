window.onload=function(){
	var aLi=document.getElementsByTagName("li");
	var aDiv=document.getElementsByTagName("div");
	var aNumber=getByClass(aLi,"number");
	var aOperation=getByClass(aLi,"operation");
	var aFunc=getByClass(aLi,"func");
	var aSpecialop=getByClass(aLi,"specialop");
	var oResult_show=getByClass(aDiv,"result-show")[0];
	var oInput_show=getByClass(aDiv,"input-show")[0];
	var i=0;
	var type;
	var equal=0;
//-------------------初始化----------------------------------//

	oResult_show.innerHTML="0";
	oInput_show.innerHTML="";
	
	aFunc[0].index=0;
	
	for(i=1;i<aFunc.length;i++){
		aFunc[i].index=0;
	}

//---------------------初始化----------------------------------//
//---------------------事件-----------------------------------//
	for(i=0;i<aNumber.length;i++){
		aNumber[i].onclick=function(){
			addNumber(this.innerHTML);
			type=0;
		}
	}
	
	for(i=0;i<aOperation.length;i++){
		aOperation[i].onclick=function(){
			addOption(this.innerHTML);
			type=1;
		}
	}

	for(i=0;i<aFunc.length;i++){
		aFunc[i].onclick=function(){
			specialFunc(this.innerHTML);
			type=2;
		}
	}

	for(i=0;i<aSpecialop.length;i++){
		aSpecialop[i].index=i;
	}

	for(i=1;i<aSpecialop.length;i++){
		aSpecialop[i].onclick=function(){
			specialOperation(this.index);
			type=3;
		}
	}

	aSpecialop[0].onclick=function(){
		specialOperation(this.index);
		type=4;
	}

	document.onkeydown=function(ev){
		var oEvent=event||ev;
		
		if(oEvent.shiftKey && oEvent.keyCode==53){
			active("%");
			addOption("%");
			type=1;
			return ;
		}

		if(oEvent.keyCode>=48&& oEvent.keyCode<=57){
			active(oEvent.keyCode-48);
			addNumber(oEvent.keyCode-48);
			type=0;
		}else if(oEvent.keyCode>=96 && oEvent.keyCode<=105){
			active(oEvent.keyCode-96);
			addNumber(oEvent.keyCode-96);
			type=0;
		}else if(oEvent.keyCode==110){
			active(".");
			addNumber(".");
			type=0;
		}else if(oEvent.keyCode==107){
			active("+");
			addOption("+");
			type=1;
		}else if(oEvent.keyCode==109){
			active("-");
			addOption("-");
			type=1;
		}else if(oEvent.keyCode==106){
			active("*");
			addOption("*");
			type=1;
		}else if(oEvent.keyCode==111){
			active("/");
			addOption("/");
			type=1;
		}else if(oEvent.keyCode==13){
			active("=");
			specialOperation("3");
			type=3;
		}else if(oEvent.keyCode==8){
			active("DEL");
			specialFunc("DEL");
			type=2;
		}else{
		}
	}

//---------------------事件-----------------------------------//
	

	
	var activeLi;
	function active(value){
		for(var i=0;i<aLi.length;i++){
			if(aLi[i].innerHTML==value){
				aLi[i].style.background="rgba(183,202,25,0.72)";
				activeLi=i;
				break;
			}
		}
		setTimeout(function(){
			aLi[activeLi].style.background="#D9EDF7";
		},100);
	}

	function addNumber(value){
		if(oResult_show.innerHTML.length>19){
			return false;
		}
		if(type==3){
			oResult_show.innerHTML="";
		}
		if(oResult_show.innerHTML=="0"){
			oResult_show.innerHTML=value;
		}else{
			oResult_show.innerHTML+=value;
		}
	}
	
	function addOption(value){
		var str;
		if(equal==1){
			equal=0;
			oInput_show.innerHTML=eval(oInput_show.innerHTML);
		}
		if(type==3){
			oResult_show.innerHTML="0";
		}

		if((type==0 || type==4) && oInput_show.innerHTML.length<19){
			oInput_show.innerHTML+=oResult_show.innerHTML;
			oInput_show.index+=oResult_show.innerHTML.length;
		}
		str=oInput_show.innerHTML;
		var ch=str.charAt(str.length-1);
		if(ch=="+" || ch=="-" || ch=="*" || ch=="/"){
			str=str.substring(0,str.length-1);
		}
		str+=value;
		oInput_show.innerHTML=str;
		oResult_show.innerHTML=0;
		oResult_show.index=0;
		if(oInput_show.innerHTML.length>19){
			str=oInput_show.innerHTML;
			str=str.substring(0,19);
			oInput_show.innerHTML=str;
		}
	}
	
	function specialFunc(value){
		var str;
		if(value=="DEL"){
			if(oResult_show.innerHTML.length==1){
				oResult_show.innerHTML="0";
				return ;
			}
			str=oResult_show.innerHTML;
			oResult_show.innerHTML=str.substring(0,str.length-1);
		}else if(value=="CE"){
			oResult_show.innerHTML="0";
		}else if(value=="C"){
			oResult_show.innerHTML="0";
			oInput_show.innerHTML="";
		}
	}
	
	function specialOperation(value){
		var str=oResult_show.innerHTML;
		value=parseInt(value);
		if(value==0){
			if(str=="0"){
				return ;
			}
			if(str.search('-')==-1){
				str="-"+str;
			}else{
				str=str.replace("-","");
			}
			equal=0;
		}else if(value==1){
			var result=str;
			str=Math.sqrt(result);
			oInput_show.innerHTML="";
			oInput_show.innerHTML+="sqrt("+result+")";
			equal=1;
		}else if(value==2){
			var result=str;
			oInput_show.innerHTML="1/"+result;
			str=1/parseInt(result);
			equal=1;
		}else if(value==3){
			var option=oInput_show.innerHTML.charAt(oInput_show.innerHTML.length-1);
			oInput_show.innerHTML+=oResult_show.innerHTML;
			str=eval(oInput_show.innerHTML);
			equal=1;		
		}else{
		}
		oResult_show.innerHTML=str;
	}

	//getByClass方法
	function getByClass(obj,classname){
		var arr=new Array();
		var i=0;
		for(i=0;i<obj.length;i++){
			if(obj[i].className == classname){
				arr.push(obj[i]);
			}
		}
		return arr;
	}
}


