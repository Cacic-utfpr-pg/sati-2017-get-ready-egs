#pragma strict

static var habilitado		:int;

var velocidade				:float;
var pose					:int;
var permissao				:boolean;
var telas					:int;
var plano					:GameObject;
var posiX: float;
var posiY: float;
var altura: float;
var largura: float;
var cubo	 				: GameObject;
var perSkin 				: GUISkin;

private var rodei	:System.Boolean;

var NomePersonagem: String;
var n2: String;

var n3: String;

function Start () 
{
	rodei = false;
	telas = 1;
	habilitado = 1;
	pose = 0;
	altura  = 50;
	largura = 70;
	NomePersonagem =PlayerPrefs.GetString("Personagem1");
	n2 =PlayerPrefs.GetString("Personagem2");
	n3 =PlayerPrefs.GetString("Personagem3");
	posiX = Screen.width/2 - largura/2 ; 
	posiY = Screen.height/2- altura /2 + 90;

}

function Update () 
{
	if(habilitado == 0)
	{
		if(rodei == false) cubo.GetComponent.<UnityEngine.Video.VideoPlayer>().Play();
		rodei = true;
		if(!cubo.GetComponent.<UnityEngine.Video.VideoPlayer>().isPlaying)
		{
			Application.LoadLevel("Teste");
		}
		
	}
}



function OnGUI()
{
	
	if(habilitado == 1)
	{


		GUI.skin = perSkin;

		NomePersonagem  = GUI.TextArea(Rect(posiX+largura+3,posiY,largura*2,altura),NomePersonagem);
		if (GUI.Button(Rect(posiX,posiY,largura,altura),"Começar"))
		{
		 PlayerPrefs.SetString("Personagem1",NomePersonagem);
		 PlayerPrefs.SetInt("Save1",1);
		 PlayerPrefs.SetInt("Save2",0);
		 PlayerPrefs.SetInt("Save3",0);
		 

		habilitado = 0;

		}
		/*
		 n2  = GUI.TextArea(Rect(posiX+largura+3,posiY+altura,largura*2,altura),n2);
		if (GUI.Button(Rect(posiX,posiY+altura,largura,altura),"Começar"))
		{
		 PlayerPrefs.SetString("Personagem2",n2);
		  PlayerPrefs.SetInt("Save1",0);
		 PlayerPrefs.SetInt("Save2",1);
		 PlayerPrefs.SetInt("Save3",0);
		 Application.LoadLevel("Teste");
		}

		n3  = GUI.TextArea(Rect(posiX+largura+3,posiY+altura+altura,largura*2,altura),n3);
		if (GUI.Button(Rect(posiX,posiY+altura+altura,largura,altura),"Começar"))
		{
		 PlayerPrefs.SetString("Personagem3",n3);
		  PlayerPrefs.SetInt("Save1",0);
		 PlayerPrefs.SetInt("Save2",0);
		 PlayerPrefs.SetInt("Save3",1);
		 Application.LoadLevel("Teste");
		}
		*/
	}
}