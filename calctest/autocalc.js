window.onload=function(){
	var oLow=document.getElementsByName("lowrange")[0];
	var oHigh=document.getElementsByName("highrange")[0];
	var oNum1=document.getElementsByName("number1")[0];
	var oNum2=document.getElementsByName("number2")[0];
	var oResult=document.getElementsByName("result")[0];
	var oStart=document.getElementsByName("start")[0];
	var oEnd=document.getElementsByName("end")[0];
	var oSub=document.getElementsByName("sub")[0];
	var aSpan=document.getElementsByTagName("span");
	var aUl=document.getElementsByTagName("ul");
	var aDiv=document.getElementsByTagName("div");
	var oAttention=getByClass(aDiv,"attention")[0];
	var oPeration=getByClass(aSpan,"active-operation")[0];
	var oResultShow=getByClass(aUl,"result")[0];

	var num1=new Array();
	var num2=new Array();
	var result=new Array();
	var right=new Array();
	var op=new Array();
	var low;
	var high;
	var operator;
	var oldHour;
	var oldMinute;
	var oldSecond;
	var time;
	var sum=0;
	var flag=0;
	var truenum=0;

	oStart.onclick=function(){
		
		low=oLow.value;
		high=oHigh.value;

		oResultShow.innerHTML="";
		if(flag==1){
			alert("已经开始答题");
			return false;
		}
		if(oLow.value=="" || oLow.value==null){
			alert("请输入范围");
			return false;
		}
		if(oHigh.value=="" || oHigh.value==null){
			alert("请输入范围");
			return false;
		}
		flag++;
		oldHour=new Date().getHours();
		oldMinute=new Date().getMinutes();
		oldSecond=new Date().getSeconds();

		createTopic();
	}

	oSub.onclick=function(){
		if(flag==0){
			return false;
		}
		if(oResult.value=="" || oResult.value==null){
			result[sum]=high+1;
		}else{
			result[sum]=oResult.value;
		}
		sum++;
		result[sum]=oResult.value;
		oResult.value="";
		if(sum==100){
			showResult();
		}else{
			oNum1.value="";
			oNum2.value="";
			createTopic();
		}
	}

	oEnd.onclick=function (){
		if(flag==0){
			return false;
		}
		showResult();
	}

	function showResult(){
		var i;
		if(oResult.value=="" || oResult.value==null){
			result[sum]=high+1;
		}else{
			result[sum]=oResult.value;
		}
		sum++;
		result[sum]=oResult.value;
		oResultShow.innerHTML="";
		for(i=0;i<num1.length;i++){
			var li=document.createElement("li");
			li.innerHTML=""+num1[i]+"　"+op[i]+"　"+num2[i]+"　=　"+result[i]+"　"+right[i];
			if(result[i]!=right[i]){
				li.style.color="red";
				li.innerHTML+="　错误";
			}else{
				li.innerHTML+="　正确";
				truenum++;
			}
			oResultShow.appendChild(li);
		}
		var nowHour=new Date().getHours();
		var nowMinute=new Date().getMinutes();
		var nowSecond=new Date().getSeconds();
		
		var second=nowSecond-oldSecond;
		var minute=nowMinute-oldMinute;
		var hour=nowHour-oldHour;

		if(second<0){
			second+=60;
			minute--;
		}
		if(minute<0){
			miunte+=60;
			hour--;
		}
		var per=truenum/sum*100;
		oAttention.innerHTML="一共"+sum+"道题目，答对"+truenum+"道题目，正确率"+per+"%,共用时"+hour+"时"+minute+"分"+second+"秒";
		sum=0;
		flag=0;
		truenum=0;
	}

	function createTopic(){
		var newlow=low;
		var newhigh=high;
		var newnum1=Math.random()*(newhigh-newlow)+newlow;
		var	newnum2=Math.random()*(newhigh-newlow)+newlow;
		num1[sum]=Math.floor(newnum1);
		num2[sum]=Math.floor(newnum2);
		var newoperation=Math.random()*4;
		operation=Math.floor(newoperation);
		if(operation==0){
			oPeration.innerHTML="+";
			op[sum]="+";
			right[sum]=num1[sum]+num2[sum];
		}else if(operation==1){
			oPeration.innerHTML="-";
			op[sum]="-";
			var max=num1[sum]>num2[sum]?num1[sum]:num2[sum];
			var min=num1[sum]<num2[sum]?num1[sum]:num2[sum];
			num1[sum]=max;
			num2[sum]=min;
			right[sum]=num1[sum]-num2[sum];
		}else if(operation==2){
			op[sum]="*";
			oPeration.innerHTML="*";
			right[sum]=num1[sum]*num2[sum];
		}else{			
			op[sum]="÷";
			oPeration.innerHTML="÷";
			var temp;
			var max=num1[sum]>num2[sum]?num1[sum]:num2[sum];
			var min=num1[sum]<num2[sum]?num1[sum]:num2[sum];
			if(min==0){		
				num1[sum]=min;
				num2[sum]=max;
			}else{
				num1[sum]=max;
				num2[sum]=min;
				temp=max/min;
				temp=Math.ceil(temp);
				num1[sum]=min*temp;
			}
			right[sum]=num1[sum]/num2[sum];
		}
		oNum1.value=num1[sum];
		oNum2.value=num2[sum];
	}

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