var material1			:Material;
var material2			:Material;
var particula			:ParticleSystem;
var plano				:GameObject;
var boss				:GameObject;
var oliver				:GameObject;
var ponto				:GameObject;

private var distOliver	:float;
private var estavaPress	:System.Boolean;

function Start()
{
	particula.Stop();
	estavaPress = false;
}

function Update()
{	
	distOliver = Vector3.Distance(ponto.transform.position, oliver.transform.position);
	
	if(boss.GetComponent(IABoss).atacou > 30)
	{
		GetComponent.<Renderer>().material = material2;
		
		if(distOliver < 2)
		{
			particula.Play();
			plano.SetActive(true);
			estavaPress = true;
		}
		else
		{
			if(estavaPress == true)
			{
				estavaPress = false;
				boss.GetComponent(IABoss).atacou = 0;
				particula.Stop();
				plano.SetActive(false);
			}
		}
	}
	else
	{
		GetComponent.<Renderer>().material = material1;
	}
}