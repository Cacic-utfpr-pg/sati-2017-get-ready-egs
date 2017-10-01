#pragma strict

var distAlcance						:float;
var distanciaMax					:int;
var pausa 							:int;
var alcance							:GameObject;
var alcanceTodos					:GameObject[];

private var velMov					:float;
private var rotacao					:float;
private var auxRotacao				:float;
private var auxRotacao2				:float;
private var tempoMudarDir			:int;
private var auxMudarDir				:int;
private var auxTempo				:int;
private var auxTempo2				:int;
private var voltando				:System.Boolean;
private var virando					:System.Boolean;

function Start () 
{	
	distanciaMax = 100;
	voltando = false;
	virando = false;
	pausa = 0;
	auxMudarDir = 0;
}

function Update () 
{
	alcanceTodos = GameObject.FindGameObjectsWithTag("caminho");
	for(var alcance2 : GameObject in alcanceTodos)
	{
		distAlcance = Vector3.Distance(transform.position, alcance2.transform.position);
		if(distAlcance < distanciaMax-1)
		{
			alcance = alcance2;
			break;
		}
	}
	
	auxTempo = Time.fixedTime;
	if(auxTempo!=auxTempo2)
	{
		tempoMudarDir++;
		auxTempo2 = auxTempo;
	}
	
	velMov = 12*Time.deltaTime;
	if(virando == false)
	rotacao = 360*Random.value;

	if(distAlcance < distanciaMax && voltando == false)
	{
		if(auxMudarDir < 3  && pausa == 0)
		{

			if(tempoMudarDir >= 4)	
			{
				if(virando == false)
				{
					auxRotacao2 = 0;
					virando = true;
				}
				auxRotacao = rotacao;
				if(auxRotacao >= 0) auxRotacao2 += 1.3;
				else auxRotacao2 -= 1.3;
				if(auxRotacao >= 0) transform.Rotate(0,1,0);
				else transform.Rotate(0,-1,0);
				if(auxRotacao2 <= auxRotacao+3 && auxRotacao2 >= auxRotacao-3) 
				{
					virando = false;
					tempoMudarDir = 0;
					auxMudarDir++;
				}
			}
		}
	}
	else
	{
		voltando = true;
		if(distAlcance < distanciaMax/1.5 ) voltando = false;

		transform.LookAt(Vector3(alcance.transform.position.x, transform.position.y, alcance.transform.position.z));
		tempoMudarDir = 0;
		auxRotacao2 = 0;
		virando = false;
	}
	transform.Translate(velMov,0,0);
	
}