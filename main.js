  
    var s;
    var p;
    var f;

function res()
{
    
  
    s=0;
    var x=document.getElementById("formtest");
    var i;
    var flag;
    flag=0;
    for(i=0;i<x.length;i++)
    {
        if(parseInt(x.elements[i].value)>5 || parseInt(x.elements[i].value)<1)
        {
        alert("enter values from 1 to 5 only in the test");
        break;
        flag=1;
        }
        else
        s=s+parseInt(x.elements[i].value);
    }
    if(flag==0)
    {
        p = s/75;
        f = p*100;
        document.getElementById("result").innerHTML="Your Mental Well-Being is "+ f +"% in danger.";
        document.getElementById("testsubmitbtn").style.visibility="hidden";
        document.getElementById("solnbtn").style.visibility="visible";
    }
    
    if(flag==1)
    document.getElementById("result").innerHTML="please enter valid data";
    

}

function soln()
{
    document.getElementById("mwb").style.visibility="hidden";
    document.getElementById("solnbtn").style.visibility="hidden";
     if(f >=55)
     {
        document.getElementById("soln1").style.visibility="visible";
        document.getElementById("soln1").style.top= "-1550px";
     }

     else if(f < 55)
     {
        document.getElementById("soln2").style.visibility="visible";
        document.getElementById("soln2").style.top= "-1550px";
     }
}
