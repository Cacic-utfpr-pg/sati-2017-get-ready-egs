#pragma strict

var velMov							:float;
var tempoCarencia					:int;
var distOliver						:float;
var distInimigoOliver				:float;
var distInimigo						:float;
var pausa 							:int;
var cam								:Transform;
var oliver							:Transform;


private var distAlcance				:float;
private var distanciaMax			:int;
private var alcance					:GameObject;
private var alcanceTodos			:GameObject[];
private var tempoAnimEsperando		:int;
private var tempoAcenar				:int;
private var tempoMudarDir			:int;
private var auxMudarDir				:int;
private var auxTempo				:int;
private var auxTempo2				:int;
private var anim 					:Animation;
private var rotacao					:float;
private var aux1					:float;
private var aux2					:float;
private var aux4					:float;
private var anguloZul				:float;
private var anguloOliver			:float;
private var aux3					:System.Boolean;
private var inimigos				:GameObject[];
private var alvo					:GameObject;
private var voltando				:System.Boolean;
private var rodandoEsp				:System.Boolean;


public var vaiCair					:System.Boolean;
public var vsFinalBoss				:System.Boolean;


function Start () 
{	
	rodandoEsp = false;
	aux3 = false;
	voltando = false;
	pausa = 0;
	auxMudarDir = 0;
	distanciaMax = 10;
	anim = GetComponent.<Animation>();
	anim["Armature.001|andando"].speed = 1.5;
	anim["Armature.001|esperandoEmPe"].speed = 0.7;
	anim["Armature.001|esperando"].speed = 0.7;
	anim["Armature.001|acenando"].speed = 0.7;
	anim["Armature.001|pedindoColo"].speed = 0.7;
	anim["Armature.001|pedindoColoVolta"].speed = 0.7;
	
}

function Update () 
{
	auxTempo = Time.fixedTime;
	if(auxTempo!=auxTempo2)
	{
		tempoCarencia++;	
		tempoAnimEsperando++;
		tempoAcenar++;
		tempoMudarDir++;
		auxTempo2 = auxTempo;
	}
	
	alcanceTodos = GameObject.FindGameObjectsWithTag("alcance");
	for(var alcance2 : GameObject in alcanceTodos)
	{
		distAlcance = Vector3.Distance(transform.position, alcance2.transform.position);
		if(distAlcance < distanciaMax-1)
		{
			alcance = alcance2;
			break;
		}
	}
	
	if(vsFinalBoss == true) velMov = -1*Time.deltaTime;
	else velMov = -3*Time.deltaTime;
	rotacao = 360*Random.value;
	distOliver = Vector3.Distance(transform.position, oliver.position);
	
	aux1 = distOliver/ Mathf.Sin(90);
	
	aux2 = oliver.position.x - transform.position.x;
	if(aux2 < 0) aux2 = -aux2;
	aux4 = oliver.position.y - transform.position.y;
	if(aux4 < 0) aux4 = -aux4;
	anguloZul = 180/Mathf.PI *  Mathf.Asin(aux2/aux1);
	anguloOliver = 180/Mathf.PI *  Mathf.Asin(aux4/aux1);
	
	if(oliver.position.x - transform.position.x < 0)
	{
		if(oliver.position.y - transform.position.y < 0)
		{
			anguloZul = 180 + anguloZul;
			anguloOliver = 90 - anguloOliver;
		}
		else
		{
			anguloZul = 180 - anguloZul;
			anguloOliver = -90 + anguloOliver;
		}
	}
	else
	{
		if(oliver.position.y - transform.position.y < 0)
		{
			anguloOliver = 90 + anguloOliver;
		}
		else
		{
			anguloOliver = -90 - anguloOliver;
		}
	}
	inimigos = GameObject.FindGameObjectsWithTag("inimigo");
	if(inimigos == null)distInimigoOliver = 100;
	else
	{
		for(var inimigo : GameObject in inimigos)
		{
			distInimigoOliver = Vector3.Distance(oliver.position, inimigo.transform.position);
			alvo = inimigo;
			if(distInimigoOliver <= 5)
			{
				break;
			}
		}
	}
	
	//respawna o zul
	if(distOliver > 100)
	{
		for(var alcance2 : GameObject in alcanceTodos)
		{
			distAlcance = Vector3.Distance(oliver.transform.position, alcance2.transform.position);
			if(distAlcance < Vector3.Distance(oliver.transform.position, alcance.transform.position) )
			{
				alcance = alcance2;
			}
		}
		transform.position = alcance.transform.position;
	}
	
	
	
	if(distInimigoOliver > 20 && distInimigoOliver > distOliver)
	{		
		if(distOliver < 1.5 || (pausa > 1 && pausa <= 5))
		{
			if(pausa == 0)
			{
				pausa = 2;
				GetComponent.<Animation>().Play("Armature.001|sentando");
			}
			if(!GetComponent.<Animation>().isPlaying && pausa == 2) pausa = 3;
			
			if(pausa == 3)
			{
				if(pausa == 3  && !(distOliver < 1.5 )) pausa = 4;
			}
			
			if(pausa == 4)
			{
				pausa = 5;
				GetComponent.<Animation>().Play("Armature.001|levantando");
			}
			if(!GetComponent.<Animation>().isPlaying && pausa == 5) pausa = 0;
		}

		if(distAlcance < distanciaMax && voltando == false)
		{
			if(auxMudarDir < 3  && pausa == 0)
			{

				if(tempoMudarDir >= 4)	
				{
					transform.Rotate(0,rotacao,0);
					tempoMudarDir = 0;
					auxMudarDir++;
				}

				if(vaiCair == true) transform.rotation.y = transform.rotation.y + 180;
				transform.Translate(0,0,velMov);
				GetComponent.<Animation>().Play("Armature.001|andando");
			}
			else
			{
				
				if(pausa == 0 || (pausa > 11 && pausa <= 12))
				{
					if(pausa == 0)
					{
						pausa = 12;
						GetComponent.<Animation>().Play("Armature.001|esperando");
						if(Random.value*100 < 15) 
						{
							auxMudarDir = 0;
							tempoMudarDir = 0;
						}
					}
					if(!GetComponent.<Animation>().isPlaying && pausa == 12) 
					{
						pausa = 0;
					}
				}
			}
			
			if(distOliver > 20 || (pausa > 12 && pausa <= 13))
			{
				tempoAnimEsperando = 0;
				pausa = 13;
				transform.LookAt(Vector3(oliver.position.x,transform.position.y,oliver.position.z));
				
				if(!(distOliver > 5)) pausa = 0;
			}
		}
		else
		{
			voltando = true;
			if(distAlcance < distanciaMax/2 ) voltando = false;

			transform.LookAt(Vector3(alcance.transform.position.x, transform.position.y, alcance.transform.position.z));
			transform.rotation.eulerAngles.y = transform.rotation.eulerAngles.y +180;
			transform.Translate(0,0,velMov);
			GetComponent.<Animation>().Play("Armature.001|andando");
		}	
	
		
	}
	else
	{
		if(distInimigoOliver < 10)
		{
			distInimigo = Vector3.Distance(transform.position, alvo.transform.position);
			if(distInimigo > 2)
			{
				pausa = 0;
				transform.LookAt(Vector3(alvo.transform.position.x, transform.position.y, alvo.transform.position.z));
				transform.rotation.eulerAngles.y = transform.rotation.eulerAngles.y +180;
				transform.Translate(0,0,velMov);
				GetComponent.<Animation>().Play("Armature.001|andando");
			}
			else
			{
				if(pausa == 0)
				{
					pausa = 17;
					GetComponent.<Animation>().Play("Armature.001|golpe");
				}
				if(!GetComponent.<Animation>().isPlaying && pausa == 17) 
				{
					pausa = 0;
					
					if(vsFinalBoss == false)
					{
						alvo.GetComponent(IAInimigo).vida -= 1;
					
						alvo.transform.LookAt(Vector3(transform.position.x, alvo.transform.position.y ,transform.position.z));
						alvo.transform.Translate(0,0,-2);
						
						if(alvo.GetComponent(IAInimigo).vida <= 0)
						{
							alvo.transform.Translate(0,-1000,0);
							alvo.GetComponent(IAInimigo).enabled = false;
							alvo.GetComponent(Rigidbody).useGravity = false;
						}
					}
					else alvo.GetComponent(IABoss).vida -= 1;
				}
			}
		}
		else
		{
			if(distOliver > 2 || (pausa > 18 && pausa <= 19))
			{
				tempoAnimEsperando = 0;
				pausa = 19;
				transform.LookAt(Vector3(oliver.position.x,transform.position.y,oliver.position.z));
				transform.rotation.eulerAngles.y = transform.rotation.eulerAngles.y +180;
				
				if(vaiCair == false)
				{
					transform.Translate(0,0,velMov);
					GetComponent.<Animation>().Play("Armature.001|andando");
				}
				
				if(!(distOliver > 5)) pausa = 0;
			}
			else
			{
				if(distInimigoOliver < 20 && distInimigoOliver >= 10)
				{
				transform.LookAt(Vector3(alvo.transform.position.x, transform.position.y, alvo.transform.position.z));
				transform.rotation.eulerAngles.y = transform.rotation.eulerAngles.y +180;
					if(pausa == 0)
					{
						pausa = 18;
						GetComponent.<Animation>().Play("Armature.001|poseAtaque");
					}
				}
				else pausa = 0;
			}
		}
		
	}
	
}