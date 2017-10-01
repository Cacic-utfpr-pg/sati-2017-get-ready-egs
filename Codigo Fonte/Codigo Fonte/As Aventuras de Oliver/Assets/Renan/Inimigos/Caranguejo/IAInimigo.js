#pragma strict

var oliver							:GameObject;
var zul								:GameObject;
var distOliver						:float;
var distZul							:float;
var distZulOliver					:float;
var distAlcance						:float;
var distanciaMax					:int;
var pausa 							:int;
var alcance							:GameObject;
var alcanceTodos					:GameObject[];

private var velMov					:float;
private var rotacao					:float;
private var anim					:Animation;
private var tempoMudarDir			:int;
private var auxMudarDir				:int;
private var auxTempo				:int;
private var auxTempo2				:int;
private var auxTempoMs				:float;
private var auxTempo2Ms				:float;
private var tempoMs					:float;
private var voltando				:System.Boolean;
private var vai						:System.Boolean;
private var atacou					:System.Boolean;


public var vaiCair					:System.Boolean;
public var vida						:int;

function Start () 
{	
	vida = 3;
	distanciaMax = 11;
	voltando = false;
	vai = false;
	atacou = false;
	pausa = 0;
	auxMudarDir = 0;
	anim = GetComponent.<Animation>();
	anim["Armature|atacar"].speed = 1.5;
	anim["Armature|Provocar"].speed = 0.4;
	zul.GetComponent(IAZul).vsFinalBoss = false;
	oliver.GetComponent(movimentacao).vsFinalBoss = false;
	
}

function Update () 
{
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
	
	auxTempo = Time.fixedTime;
	if(auxTempo!=auxTempo2)
	{
		tempoMudarDir++;
		auxTempo2 = auxTempo;
	}
	
	auxTempoMs = Time.realtimeSinceStartup*10;
	if(auxTempoMs!=auxTempo2Ms)
	{
		if(vai == true)
		tempoMs = tempoMs + 0.1;	
		auxTempo2Ms = auxTempoMs;
	}
	
	velMov = 4*Time.deltaTime;
	rotacao = 360*Random.value;
	
	distOliver = Vector3.Distance(transform.position, oliver.transform.position);
	distZul = Vector3.Distance(transform.position, zul.transform.position);
	distZulOliver = Vector3.Distance(oliver.transform.position, zul.transform.position);

	if(oliver.GetComponent(movimentacao).vida > -1)
	{
		if(distAlcance < distanciaMax && voltando == false)
		{
			if((distZulOliver > distOliver || (oliver.GetComponent(movimentacao).semZul == false && distOliver < 10)) && distOliver < 10 || oliver.GetComponent(movimentacao).vida == 0)
			{
				if(distOliver <= 1.5 || oliver.GetComponent(movimentacao).vida == 0)
				{
					if(oliver.GetComponent(movimentacao).vida == 0)
					{
						if(pausa != 99)
						{
							pausa = 99;
							GetComponent.<Animation>().Play("Armature|Provocar");
						}
						if(!GetComponent.<Animation>().isPlaying && pausa == 99) 
						{
							oliver.GetComponent(movimentacao).vida -= 1;
							//pausa = 0;
						}
					}
					else
					{
						if(pausa != 17)
						{
							pausa = 17;
							GetComponent.<Animation>().Play("Armature|atacar");
							vai = true;
						}
						if(tempoMs > 3 && pausa == 17) 
						{
							vai = false;
							tempoMs = 0;
							pausa = 0;
							atacou = true;
							oliver.transform.LookAt(Vector3(transform.position.x, oliver.transform.position.y ,transform.position.z));
							oliver.GetComponent(movimentacao).vida -= 1;
							oliver.transform.Translate(0,0,-0.5);
							
						}
					}
				}
				else
				{
					if(atacou == true)
					{
						vai = true;
						if(tempoMs > 10)
						{
							atacou = false;
							vai = false;
							tempoMs = 0;
						}
						GetComponent.<Animation>().Play("Armature|Respirando");
					}
					else
					{
						transform.LookAt(Vector3(oliver.transform.position.x, transform.position.y ,oliver.transform.position.z));
						transform.Translate(0,0,velMov);
						GetComponent.<Animation>().Play("Armature|Andar");
					}
				}
			}
			else
			{
				if( distZulOliver < distOliver && distZul < 10)
				{
					if(distZul <= 1)
					{
						if(pausa != 17)
						{
							pausa = 17;
							GetComponent.<Animation>().Play("Armature|atacar");
							vai = true;
						}
						if(tempoMs > 3 && pausa == 17) 
						{
							vai = false;
							tempoMs = 0;
							pausa = 0;
							atacou = true;
							zul.transform.LookAt(Vector3(transform.position.x, zul.transform.position.y ,transform.position.z));
						}
					}
					else
					{
						if(atacou == true)
						{
							vai = true;
							if(tempoMs > 4)
							{
								atacou = false;
								vai = false;
								tempoMs = 0;
							}
							GetComponent.<Animation>().Play("Armature|Respirando");
						}
						else
						{
							transform.LookAt(Vector3(zul.transform.position.x, transform.position.y ,zul.transform.position.z));
							transform.Translate(0,0,velMov);
							GetComponent.<Animation>().Play("Armature|Andar");
						}
					}
				}
				else
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
						GetComponent.<Animation>().Play("Armature|Andar");
					}
					else
					{
						
						if(pausa == 0 || (pausa > 11 && pausa <= 12))
						{
							if(pausa == 0)
							{
								pausa = 12;
								GetComponent.<Animation>().Play("Armature|Respirando");
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
				}
			}
		}
		else
		{
			voltando = true;
			if(distAlcance < distanciaMax/2 ) voltando = false;

			transform.LookAt(Vector3(alcance.transform.position.x, transform.position.y, alcance.transform.position.z));
			transform.Translate(0,0,velMov);
			GetComponent.<Animation>().Play("Armature|Andar");
		}
	}
}