var audio1  			:AudioSource;
var audio2  			:AudioSource;
	
var portal				:GameObject;
var oliver				:GameObject;
var carrinho			:GameObject;
var zul					:GameObject;
var cam					:Transform;

private var distPortal	:float;
private var distCar		:float;
private var jaTocou		:int;

function Start()
{
	audio1.Play();
	audio2.Stop();
}

function Update()
{
	distPortal = Vector3.Distance(oliver.transform.position, portal.transform.position);
	
	if(oliver.transform.position.y < 225.83) oliver.GetComponent(movimentacao).pausa = 98;
	if(zul.transform.position.y <= 225.83) 
	{
		zul.transform.position.x = cam.position.x;
		zul.transform.position.y = oliver.transform.position.y;
		zul.transform.position.z = cam.position.z;
	}
	
	distCar = Vector3.Distance(oliver.transform.position, carrinho.transform.position);
	print(distCar);
	if( distCar < 8 && jaTocou < 1)
	{
		audio2.Play();
		jaTocou = 1;
	}
	
	if(distPortal < 5) Application.LoadLevel("Labirinto");
}