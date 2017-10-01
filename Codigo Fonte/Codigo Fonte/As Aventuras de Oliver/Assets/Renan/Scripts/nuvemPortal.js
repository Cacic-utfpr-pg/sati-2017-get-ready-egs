var particula1	:ParticleSystem;
var particula2	:ParticleSystem;
var particula3	:ParticleSystem;
var particula4	:ParticleSystem;
var oliver		:Transform;
var portal		:Transform;

private var distPortal :float;
private var podePassar :System.Boolean;

function Start()
{
	podePassar = false;
	particula1.Stop();
	particula2.Stop();
	particula3.Stop();
	particula4.Stop();
}

function Update()
{
	particula3.transform.LookAt(oliver.position);
	distPortal = Vector3.Distance(oliver.transform.position, portal.transform.position);
	
	if(podePassar == true && distPortal < 3)
	{
		Application.LoadLevel("FaseQuarto");
	}
}

function OnCollisionEnter (collision: Collision)
{
	particula1.Play();
	particula2.Play();
	particula3.Play();
	particula4.Play();
	podePassar = true;
}