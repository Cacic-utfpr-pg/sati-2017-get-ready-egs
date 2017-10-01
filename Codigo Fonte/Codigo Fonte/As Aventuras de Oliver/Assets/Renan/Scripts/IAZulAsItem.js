#pragma strict

var tempo		:int;

private var auxTempo	:int;
private var auxTempo2	:int;
private var anim : Animation;
var pausa :int;

function Start () 
{	
	pausa = 0;
	anim = GetComponent.<Animation>();
	//anim["Armature.001|sentadoRespirando"].speed = 0.3;
}

function Update () 
{
	auxTempo = Time.fixedTime;
	if(auxTempo!=auxTempo2)
	{
		//tempo++;	
		auxTempo2 = auxTempo;
	}

	if(pausa == 0)
	{
		pausa = 2;
		GetComponent.<Animation>().Play("Armature.001|sentadoInicio");
	}
	if(!GetComponent.<Animation>().isPlaying && pausa == 2) pausa = 3;
	
	if(pausa == 3)
	{
		GetComponent.<Animation>().Play("Armature.001|sentadoRespirando");
	}
}