var oliver					:GameObject;
var esfera1					:GameObject;
var esfera2					:GameObject;
var ossoE1					:GameObject;
var ossoE2					:GameObject;
var particula				:ParticleSystem;
var particula2				:ParticleSystem;

private var distOliver		:float;
private var anim 			:Animation;
private var pausa 			:int;
private var velRecuo		:float;
private var aux				:int;
private var vai				:System.Boolean;


private var auxTempoMs		:float;
private var auxTempo2Ms		:float;
private var tempoMs			:float;
private var tempoStart		:float;


public var atacou			:int;
public var velProj			:float;
public var morreu			:System.Boolean;


function Start()
{
	particula.Stop();
	particula2.Stop();
	morreu = false;
	E1Mirando = false;
	E2Mirando = false;
	velRecuo = 0.4;
	velProj = 0.7;
	aux = 0;
	pausa = 0;
	anim = GetComponent.<Animation>();
	anim["Armature|Provoke/summon"].speed = 1.2;
}

function Update()
{	

	auxTempoMs = Time.realtimeSinceStartup*10;
	if(auxTempoMs!=auxTempo2Ms)
	{
		tempoStart += 0.1;
		if(vai == true)
		tempoMs = tempoMs + 0.1;	
		auxTempo2Ms = auxTempoMs;
	}
	
	if(pausa == 0 || pausa == 1)
	{
		if(pausa == 0)
		{
			particula.Play();
			particula2.Play();
			anim.Play("Armature|Provoke/summon");
			pausa = 1;
		}
		if(!GetComponent.<Animation>().isPlaying && pausa == 1)
		{
			pausa = 2;
			particula.Stop();
			particula2.Stop();
		}
	}
	if(tempoStart > 20)
	{
		distOliver = Vector3.Distance(transform.position, oliver.transform.position);
			
		transform.LookAt(Vector3(oliver.transform.position.x, transform.position.y, oliver.transform.position.z));
		
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
	
	if(morreu == true) gameObject.SetActive(false);
}

function OnCollisionEnter (collision: Collision)
{
	morreu = true;
}