var audio1  		:AudioSource;
var audio2 			:AudioSource;

var portal4			:GameObject;

var pInicio			:GameObject;

var oliver			:GameObject;
var zul				:GameObject;
var cam				:Transform;

private var distP4	:float;

function Start()
{
	audio1.Play();
	audio2.Play();
	
}

function Update()
{
	distP4 = Vector3.Distance(oliver.transform.position, portal4.transform.position);
	
	if(distP4 < 3) Application.LoadLevel("FaseBoss");
	
	if(oliver.transform.position.y < 268.85) oliver.GetComponent(movimentacao).pausa = 98;
	if(zul.transform.position.y <= 268.85) 
	{
		zul.transform.position.x = cam.position.x;
		zul.transform.position.y = oliver.transform.position.y;
		zul.transform.position.z = cam.position.z;
	}
	
	if(!audio1.isPlaying) audio1.Play();
}