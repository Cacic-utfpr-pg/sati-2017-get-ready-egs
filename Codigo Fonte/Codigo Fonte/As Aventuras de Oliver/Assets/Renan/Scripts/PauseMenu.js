var mainMenuSceneName : String;
var pauseMenuFont : Font;
var tela		:int;


public var pauseEnabled = false;			

function Start(){
	pauseEnabled = false;
	Time.timeScale = 1;
	AudioListener.volume = 1;
	tela = 1;
}

function Update(){

	if(Input.GetKeyDown( KeyCode.Escape))
	{
	
	
		if(pauseEnabled == true)
		{
			Cursor.visible = false;

			pauseEnabled = false;
			Time.timeScale = 1;
			AudioListener.volume = 1;
		}
		

		else 
		{
			if(pauseEnabled == false)
			{
				Cursor.visible = true;
				pauseEnabled = true;
				AudioListener.volume = 0;
				Time.timeScale = 0;
			}
		}
	}
}

private var showGraphicsDropDown = false;

function OnGUI(){

	GUI.skin.box.font = pauseMenuFont;
	GUI.skin.button.font = pauseMenuFont;
	if( pauseEnabled == false) tela = 1;
	
	if((pauseEnabled == true)&&(tela == 1))
	{	
		//Make a background box
		GUI.Box(Rect(Screen.width /2 - 100,Screen.height /2 - 100,250,200), "Pause Menu");
		
		//Make Main Menu button
		if(GUI.Button(Rect(Screen.width /2 - 100,Screen.height /2 - 50,250,50), "Menu principal")){
			
		}

			if(GUI.Button(Rect(Screen.width /2 - 100,Screen.height /2 ,250,50), "Alterar Gráfico")){
			
			if(showGraphicsDropDown == false){
				showGraphicsDropDown = true;
			}
			else{
				showGraphicsDropDown = false;
			}
		}

		if(showGraphicsDropDown == true){
			if(GUI.Button(Rect(Screen.width /2 + 150,Screen.height /2 ,250,50), "Fastest")){
				QualitySettings.currentLevel = QualityLevel.Fastest;
				
			}
			if(GUI.Button(Rect(Screen.width /2 + 150,Screen.height /2 + 50,250,50), "Fast")){
				QualitySettings.currentLevel = QualityLevel.Fast;
			}
			if(GUI.Button(Rect(Screen.width /2 + 150,Screen.height /2 + 100,250,50), "Simple")){
				QualitySettings.currentLevel = QualityLevel.Simple;
			}
			if(GUI.Button(Rect(Screen.width /2 + 150,Screen.height /2 + 150,250,50), "Good")){
				QualitySettings.currentLevel = QualityLevel.Good;
			}
			if(GUI.Button(Rect(Screen.width /2 + 150,Screen.height /2 + 200,250,50), "Beautiful")){
				QualitySettings.currentLevel = QualityLevel.Beautiful;
			}
			if(GUI.Button(Rect(Screen.width /2 + 150,Screen.height /2 + 250,250,50), "Fantastic")){
				QualitySettings.currentLevel = QualityLevel.Fantastic;
			}
			
			if(Input.GetKeyDown("escape")){
				showGraphicsDropDown = false;
			}
		}
		//GUI.Box (Rect (Screen.width /2 + 200,Screen.height/2 - 100,300,100), "Lembre-se: Se o game retornar a tela de\n menu, significa que voce morreu \ndurante o gameplay.");
		//Make quit game button
		if (GUI.Button (Rect (Screen.width /2 - 100,Screen.height /2 + 50,250,50), "Controles")){
			tela = 3;
		}
		
		if (GUI.Button (Rect (Screen.width /2 - 100,Screen.height /2 + 100,250,50), "Quit Game"))
		{
			tela = 2;
		}
	
	}
	
	if((pauseEnabled == true)&&(tela == 2))
	{
		if(GUI.Button(Rect(Screen.width /2 - 100,Screen.height /2 - 50,250,50), "Retornar ao menú principal")){
			Application.LoadLevel("menu");
		}
		if(GUI.Button(Rect(Screen.width /2 - 100,Screen.height /2,250,50), "Encerrar o jogo")){
			Application.Quit();
		}
		if(GUI.Button(Rect(Screen.width /2 - 100,Screen.height /2 + 50,250,50), "Cancela")){
			tela = 1;
		}
		
	}
	
	if((pauseEnabled == true)&&(tela == 3))
	{
		GUI.Box(Rect(Screen.width /2 - 100,Screen.height /2 - 50,250,200), "Controles:\n\n a,s,d,w - Movimenta o Oliver\n ESPAÇO - Pula\nShift+Espaço - Pulo baixo\n1- Coloca o Zul no chão (parado)\n1 - Pega o Zul\n2- Coloca o Zul no chão (movimentando)\n3- Chama o Zul imediatamente para perto\n L - nunca aperte");
	}
}