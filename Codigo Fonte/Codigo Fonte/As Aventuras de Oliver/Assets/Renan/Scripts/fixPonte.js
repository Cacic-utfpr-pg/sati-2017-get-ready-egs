var oliver					:GameObject;
var marcaPonte				:GameObject;
var ponte					:GameObject;
var derruba					:GameObject;

private var distmarcaPonte	:float;
private var distDerruba		:float;
private var velDerruba		:float;
private var ponteCaindo		:System.Boolean;
private var vai				:System.Boolean;
private var start			:System.Boolean;
private var anim 			:Animation;

function Start()
{
	vai = false;
	ponteCaindo = false;
	start = false;
	anim = ponte.GetComponent.<Animation>();
	anim["Ponte animation|BridgeDown"].speed = 0.9;
	distDerruba = Vector3.Distance(transform.position, derruba.transform.position);
}

function Update()
{	
	
	
	if( distDerruba > 3 || start == false)
	{
		transform.position = Vector3(oliver.transform.position.x, transform.position.y, oliver.transform.position.z);	
		
		velDerruba = 5.4* Time.deltaTime;
		if(vai == true) derruba.transform.Translate(0,0,-velDerruba);
		
		distDerruba = Vector3.Distance(transform.position, derruba.transform.position);
		
		if(marcaPonte.transform.position.z - transform.position.z < -32) transform.position.z = 612.54;
		if(marcaPonte.transform.position.z - transform.position.z > 38) transform.position.z = 547;

		if(marcaPonte.transform.position.x - transform.position.x > 2.5) transform.position.x = 154;
		if(marcaPonte.transform.position.x - transform.position.x < -3) transform.position.x = 159;
		
		distmarcaPonte = Vector3.Distance(oliver.transform.position, marcaPonte.transform.position); 
		
		if( distmarcaPonte < 5) 
		{
			vai = true;
			ponte.GetComponent.<Animation>().Play("Ponte animation|BridgeDown");
			ponteCaindo = true;
		}
		if(!ponte.GetComponent.<Animation>().isPlaying && ponteCaindo == true)
		{
			ponteCaindo = false;
			Destroy(ponte);
		}
		
		transform.LookAt(Vector3(oliver.transform.position.x, transform.position.y, oliver.transform.position.z));
	}
	else transform.Translate(0,1000,0);
}

function OnCollisionEnter (collision: Collision)
{
	start = true;
} 