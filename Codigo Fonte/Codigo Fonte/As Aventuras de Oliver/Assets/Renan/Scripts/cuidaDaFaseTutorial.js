#pragma strict

var portal	:GameObject;
var oliver	:GameObject;
var cam		:Transform;
var zul		:GameObject;
var placa	:Transform;

var audio1  :AudioSource;
var audio2  :AudioSource;
var audio3  :AudioSource;

private var distPortal	:float;
private var distPlaca	:float;
private var jaTocou		:int;

function Start()
{
	jaTocou = 0;
	audio1.Play();
	audio2.Play();
	audio3.Stop();
}

function Update()
{
	if(oliver.transform.position.y <= 247) oliver.GetComponent(movimentacao).pausa = 98;
	if(zul.transform.position.y <= 247) 
	{
		zul.transform.position.x = cam.position.x;
		zul.transform.position.y = oliver.transform.position.y;
		zul.transform.position.z = cam.position.z;
	}
	
	distPortal = Vector3.Distance(oliver.transform.position, portal.transform.position);
	distPlaca = Vector3.Distance(oliver.transform.position, placa.transform.position);

	if( distPortal < 12 && jaTocou < 1)
	{
		audio3.Play();
		jaTocou = 1;
	}
	
	if(!audio1.isPlaying) audio1.Play();
}

function OnGUI () 
{
	if(cam.GetComponent(PauseMenu).pauseEnabled == false)
	{
		if(distPlaca <= 2)
		{
			GUI.Box(Rect(Screen.width /2 - 100,Screen.height /2 - 100,250,200), "Quick tip!\n\nPara confrontar os inimigos, coloque o Zul no chão apertando 2!\n mas lembresse o Zul corre na mesma velocidade que seus inimigos!");
		}
		else
		{
			Cursor.visible = false;
		}
	}
}