var oliver					:GameObject;
var zul						:GameObject;
var esfera1					:GameObject;
var esfera2					:GameObject;
var ossoE1					:GameObject;
var ossoE2					:GameObject;
var boss1					:GameObject;
var boss2					:GameObject;
var boss3					:GameObject;
var boss4					:GameObject;
var tp						:GameObject;
var particula				:ParticleSystem;
var particula2				:ParticleSystem;
var audioMeiaVida			:AudioSource;


private var distOliver		:float;
private var distZul			:float;
private var anim 			:Animation;
private var pausa 			:int;
private var perdeuVida		:int;
private var velRecuo		:float;
private var aux				:int;
private var vai				:System.Boolean;
private var foi				:System.Boolean;
private var trocaPose 		:int;
private var auxTroca 		:Vector3;


private var auxTempoMs		:float;
private var auxTempo2Ms		:float;
private var tempoMs			:float;
private var tempoStart		:float;


public var comeca 			:System.Boolean;
public var vida				:int;
public var atacou			:float;
public var velProj			:float;

function Start()
{
	audioMeiaVida.Stop();
	particula.Stop();
	particula2.Stop();
	tempoStart = 0;
	E1Mirando = false;
	E2Mirando = false;
	comeca = false;
	foi = false;
	velRecuo = 0.4;
	velProj = 0.6;
	aux = 0;
	pausa = 0;
	vida = 30;
	perdeuVida = vida;
	zul.GetComponent(IAZul).vsFinalBoss = true;
	oliver.GetComponent(movimentacao).vsFinalBoss = true;
	anim = GetComponent.<Animation>();
	anim["Armature|Provoke/summon"].speed = 1.2;
}

function Update()
{
	auxTempoMs = Time.realtimeSinceStartup*10;
	if(auxTempoMs!=auxTempo2Ms)
	{
		if(foi == true)tempoStart += 0.1;
		if(vai == true) tempoMs = tempoMs + 0.1;	
		if(vida <= 5) atacou = atacou + 0.1;
		auxTempo2Ms = auxTempoMs;
	}
	distOliver = Vector3.Distance(transform.position, oliver.transform.position);
	distZul = Vector3.Distance(transform.position, zul.transform.position);
		
	transform.LookAt(Vector3(oliver.transform.position.x, transform.position.y, oliver.transform.position.z));
	
	//vai mudar dps que tiver cutscene de entrada
	
	if(comeca == true)
	{
		if(pausa == 0 || pausa == 1)
		{
			if(pausa == 0)
			{
				particula.Play();
				particula2.Play();
				anim.Play("Armature|Provoke/summon");
				pausa = 1;
				oliver.GetComponent(movimentacao).vida = 1;
			}
			if(!GetComponent.<Animation>().isPlaying && pausa == 1)
			{
				pausa = 2;
				particula.Stop();
				particula2.Stop();
			}
		}
		else
		{
			if(perdeuVida > 15)
			{
				if((perdeuVida > vida || distOliver < 2) || pausa == 3)
				{
					vai = false;
					if(pausa == 2 || distOliver < 2)
					{
						pausa = 3;
						particula.Play();
						particula2.Play();
						anim.Play("Armature|Provoke/summon");
					}
					if(distOliver < 2) oliver.GetComponent(movimentacao).vida = 0;
					if(distZul < 10) zul.transform.Translate(0,0,velRecuo);
					if(velRecuo > 0) velRecuo = velRecuo - 0.01;
					else velRecuo = 0.04;
					if(!GetComponent.<Animation>().isPlaying && pausa == 3) 
					{
						particula.Stop();
						particula2.Stop();
						perdeuVida = vida;
						pausa = 2;
						velRecuo = 0.4;
					}
				}
				
				if(pausa == 2 || pausa == 30)
				{
					if(oliver.GetComponent(movimentacao).apanhou == false)
					{
						if(pausa == 2)
						{
							if(aux == 0) 
							{
								anim.Play("Armature|Attack 1");
							}
							else 
							{
								anim.Play("Armature|Attack 2");
							}
							pausa = 30;
							vai = true;
						}
					}
					if(tempoMs > 5 && pausa == 30) 
					{
						vai = false;
						tempoMs = 0;

						if(aux == 0)
						{
							esfera1.GetComponent(SphereCollider).enabled = true;
							esfera1.GetComponent(MeshRenderer).enabled = true;
							esfera1.GetComponent(projetil).particula.Play();

							esfera1.transform.position = ossoE1.transform.position;
							esfera1.transform.LookAt(Vector3(oliver.transform.position.x, oliver.transform.position.y+1, oliver.transform.position.z));

						}
						else
						{
							esfera2.GetComponent(SphereCollider).enabled = true;
							esfera2.GetComponent(MeshRenderer).enabled = true;
							esfera2.GetComponent(projetil).particula.Play();

							esfera2.transform.position = ossoE2.transform.position;
							esfera2.transform.LookAt(Vector3(oliver.transform.position.x, oliver.transform.position.y+1, oliver.transform.position.z));
							
						}
					}
					if(!GetComponent.<Animation>().isPlaying && pausa == 30)
					{
						if(aux == 0) aux = 1;
						else aux = 0;
						pausa = 2;
					}
				}

				esfera1.transform.Translate(0,0, velProj);
				esfera2.transform.Translate(0,0, velProj);
			}
			else if(perdeuVida >= 1)
			{
				if(foi == false) 
				{
					audioMeiaVida.Play();
					pausa = 0;
					foi = true;
					transform.position = tp.transform.position;
					boss1.SetActive(true);
					boss2.SetActive(true);
					boss3.SetActive(true);
					boss4.SetActive(true);
				}
				if(tempoStart > 20)
				{
					if((pausa == 2 && perdeuVida > vida || distOliver < 2) || pausa == 3)
					{
						vai = false;
						if(pausa == 2 || distOliver < 2)
						{
							pausa = 3;
							anim.Play("Armature|Damage taken 1");
						}
						if(!GetComponent.<Animation>().isPlaying && pausa == 3) 
						{
							trocaPose = 4*Random.value;
							if(perdeuVida == 1)
							{
								transform.position = tp.transform.position;
							}
							else
							{
								boss1.GetComponent(clonesBoss).morreu = false;
								boss2.GetComponent(clonesBoss).morreu = false;
								boss3.GetComponent(clonesBoss).morreu = false;
								boss4.GetComponent(clonesBoss).morreu = false;
								
								boss1.SetActive(true);
								boss2.SetActive(true);
								boss3.SetActive(true);
								boss4.SetActive(true);
								
								
								
								if(trocaPose == 1) 
								{
									auxTroca = transform.position;
									transform.position = boss1.transform.position;
									boss1.transform.position = auxTroca;
								}
								if(trocaPose == 2) 
								{
									auxTroca = transform.position;
									transform.position = boss2.transform.position;
									boss2.transform.position = auxTroca;
								}
								if(trocaPose == 3) 
								{
									auxTroca = transform.position;
									transform.position = boss3.transform.position;
									boss3.transform.position = auxTroca;
								}
								if(trocaPose == 4) 
								{
									auxTroca = transform.position;
									transform.position = boss4.transform.position;
									boss4.transform.position = auxTroca;
								}
							}
							tempoStart = 0;
							perdeuVida = vida;
							pausa = 0;
						}
					}
					if(oliver.GetComponent(movimentacao).apanhou == false)
					{
						if(pausa == 2)
						{
							if(aux == 0) 
							{
								anim.Play("Armature|Attack 1");
							}
							else 
							{
								anim.Play("Armature|Attack 2");
							}
							pausa = 30;
							vai = true;
						}
					}
					if(tempoMs > 5 && pausa == 30) 
					{
						vai = false;
						tempoMs = 0;

						if(aux == 0)
						{
							esfera1.GetComponent(SphereCollider).enabled = true;
							esfera1.GetComponent(MeshRenderer).enabled = true;
							esfera1.GetComponent(projetil).particula.Play();

							esfera1.transform.position = ossoE1.transform.position;
							esfera1.transform.LookAt(Vector3(oliver.transform.position.x, oliver.transform.position.y+1, oliver.transform.position.z));

						}
						else
						{
							esfera2.GetComponent(SphereCollider).enabled = true;
							esfera2.GetComponent(MeshRenderer).enabled = true;
							esfera2.GetComponent(projetil).particula.Play();

							esfera2.transform.position = ossoE2.transform.position;
							esfera2.transform.LookAt(Vector3(oliver.transform.position.x, oliver.transform.position.y+1, oliver.transform.position.z));
							
						}
					}
					if(!GetComponent.<Animation>().isPlaying && pausa == 30)
					{
						if(aux == 0) aux = 1;
						else aux = 0;
						pausa = 2;
					}
					
					esfera1.transform.Translate(0,0, velProj);
					esfera2.transform.Translate(0,0, velProj);
					
				}		
			}
			else
			{
				boss1.SetActive(false);
				boss2.SetActive(false);
				boss3.SetActive(false);
				boss4.SetActive(false);
				//cutscene final
				print("fim");
			}
		}
	}
	
}