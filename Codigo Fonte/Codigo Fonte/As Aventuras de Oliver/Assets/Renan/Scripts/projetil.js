var oliver		:GameObject;
var boss		:GameObject;

public var particula	:ParticleSystem;

function Start()
{
	particula.Stop();
}

function Update()
{	
	
}

function OnCollisionEnter (collision: Collision)
{
	if(collision.gameObject.tag == "Respawn")
	{
		if( boss.GetComponent(IABoss) != null) boss.GetComponent(IABoss).vida -= 1;
		else boss.GetComponent(clonesBoss).morreu = true;
		GetComponent(MeshRenderer).enabled = false;
		particula.Stop();
	}
	else
	{
		GetComponent(SphereCollider).enabled = false;
		GetComponent(MeshRenderer).enabled = false;
		particula.Stop();
		
		if(collision.gameObject.tag == "Player")oliver.GetComponent(movimentacao).vida -= 1;

	}
}