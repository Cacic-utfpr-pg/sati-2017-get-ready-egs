var audio1  		:AudioSource;
var audio2 			:AudioSource;

var boss			:GameObject;
var bossPonto		:GameObject;
var oliver			:GameObject;
var zul				:GameObject;
var cam				:Transform;
var movTexture 		:MovieTexture;
var cubo2	 		:GameObject;
var cubo3	 		:GameObject;


private var distOliver	:float;
private var foiCutscene	:System.Boolean;
private var jaTocou		:System.Boolean;
private var jaFoi		:System.Boolean;
private var guiVai		:System.Boolean;


function Start()
{
	guiVai = false;
	foiCutscene = false;
	jaTocou = false;
	jaFoi = false;
	audio1.Stop();
	audio2.Play();
}

function Update()
{
	distOliver = Vector3.Distance(bossPonto.transform.position, oliver.transform.position);
	
	if(oliver.transform.position.y < 238.87) oliver.GetComponent(movimentacao).pausa = 98;
	if(zul.transform.position.y <= 238.87) 
	{
		zul.transform.position.x = cam.position.x;
		zul.transform.position.y = oliver.transform.position.y;
		zul.transform.position.z = cam.position.z;
	}
	
	if(distOliver < 7 && jaTocou == false)
	{
		if(jaFoi == false)
		{
			jaFoi = true;
			audio1.Play();
			cubo2.GetComponent.<UnityEngine.Video.VideoPlayer>().Play();
		}
		
		if(!cubo2.GetComponent.<UnityEngine.Video.VideoPlayer>().isPlaying)
		{
			cubo2.GetComponent.<UnityEngine.Video.VideoPlayer>().Stop();
			boss.SetActive(true);
			boss.transform.position = bossPonto.transform.position;
			boss.transform.position.y = bossPonto.transform.position.y-1.7;
			boss.GetComponent(IABoss).comeca = true; 	
			jaTocou = true;
		}
	}
	if(jaTocou == true && !audio1.isPlaying)
	{
		audio1.Play();
	}
	
	if(boss.GetComponent(IABoss).vida == 0) 
	{
		cubo3.GetComponent.<UnityEngine.Video.VideoPlayer>().Play();
		if(!cubo3.GetComponent.<UnityEngine.Video.VideoPlayer>().isPlaying)
		{
			guiVai = true;
		}
	}
}

function OnGUI()
{
	if(guiVai == true)
	{
		if(GUI.Button(Rect(Screen.width /2 - 100,Screen.height /2 - 50,250,50), "OBRIGADO POR JOGAR!"))
		{
			Application.Quit();
		}
	}
}