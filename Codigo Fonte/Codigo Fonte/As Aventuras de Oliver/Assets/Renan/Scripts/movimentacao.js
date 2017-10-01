#pragma strict

var velMov					:float;
var zul						:GameObject;
var spawnZul				:Transform;
var cam						:GameObject;
var camfstp					:GameObject;
var dano					:ParticleSystem;


private var auxTempo		:int;
private var auxTempo2		:int;
private var anim 			:Animation;
private var iAOn 			:System.Boolean;
private var tempoArTrigger	:System.Boolean;
private var shiftPress		:System.Boolean;
private var pulou			:System.Boolean;
private var jaRodou			:System.Boolean;
private var jaRodou2		:System.Boolean;
private var tempoAr			:float;
private var tempoAr2		:float;
private var alturaDep		:float;
private var alturaAnt		:float;
private var alturaAux		:float;
private var pulouT			:float;
private var perdeuVida		:int;
private var puzzle			:int;

public var vida				:int;
public var semZul 			:System.Boolean;
public var fstAtivo			:System.Boolean;
public var vsFinalBoss		:System.Boolean;
public var apanhou			:System.Boolean;
public var pausa 			:int;

function Start () 
{	
	Cursor.visible = false;
	tempoArTrigger = false;
	shiftPress = false;
	fstAtivo = false;
	jaRodou2 = false;
	apanhou = false;
	jaRodou	= false;
	semZul = false;
	pulou = false;
	iAOn = false;
	dano.Stop();
	pulouT = 0;
	puzzle = 0;
	alturaDep = 0;
	alturaAnt = 0;
	alturaAux = 0;
	tempoAr = 0;
	tempoAr2 = 0;
	pausa = 0;
	vida = 2;
	perdeuVida = 2;
	auxTempo = Time.realtimeSinceStartup*10;
	auxTempo2 = auxTempo;
	anim = GetComponent.<Animation>();
	anim["Armature|fimPuloComZulQuedaG"].speed = 1.7;
	anim["Armature|fimPuloSemZulQuedaG"].speed = 1.7;
	anim["Armature|tomadoDanoComZul"].speed = 1.7;
	anim["Armature|tomadoDanoSemZul"].speed = 1.7;
	anim["Armature|deixaZul"].speed = 1.4;
	//anim["Armature|correndoComZul"].speed = 2.0;
	//anim["Armature|correndoSemZul"].speed = 2.0;
	//anim["Armature|fimPuloComZul"].speed = 1.7;
	//anim["Armature|morrendoSemZul"].speed = 0.5;
}

function Update () 
{
	if(cam.GetComponent(PauseMenu).pauseEnabled == false && camfstp.GetComponent(PauseMenu).pauseEnabled == false)
	{
		var distZul = Vector3.Distance(zul.transform.position, transform.position);	
		
		//velocidade do objeto
		velMov = (3 + puzzle)*Time.deltaTime;
		//conta o tempo e mede variação de altura
		alturaAnt = alturaDep;
		alturaDep = transform.position.y;
		auxTempo = Time.realtimeSinceStartup*10;
		if(auxTempo!=auxTempo2)
		{
			if(tempoArTrigger == true) 
			{
				tempoAr = tempoAr + 0.1;
				tempoAr2 = tempoAr2 + 0.1;
			}
			if(pulou == true) pulouT += 0.1;
			if(pulou == false)pulouT = 0;
			auxTempo2 = auxTempo;
		}
		
		
		if(Input.GetKeyDown("l") == true)
		{
			vida = 0;
		}
		
		if(vida <= 0 && pausa < 50)
		{
			dano.Play();
			
			pausa = 99;
			if(semZul == false) GetComponent.<Animation>().Play("Armature|morrendoComZul");
			if(semZul == true) GetComponent.<Animation>().Play("Armature|morrendoSemZul");
		}
		if(!GetComponent.<Animation>().isPlaying && pausa == 99)
		{
			pausa = 98;
			dano.Stop();
		}
		if(pausa == 98) Cursor.visible = true;
		
		if(perdeuVida > vida && vida > 0)
		{
			apanhou = true;
			if(pausa != 11)
			{
				dano.Play();
				pausa = 11;
				if(semZul == false) GetComponent.<Animation>().Play("Armature|tomadoDanoComZul");
				if(semZul == true) GetComponent.<Animation>().Play("Armature|tomadoDanoSemZul");
			}
			 if(!GetComponent.<Animation>().isPlaying == true && pausa == 11) 
			 {
				 perdeuVida = vida;
				 pausa = 0;
				dano.Stop();
				apanhou = false;
			 }
		}
		else if(vida > 0)
		{
			if(fstAtivo == false)
			{
			
				if(pausa == 0)
				{
					//se não estiver apertando nada executa isso
					if(Input.anyKey == false && semZul == false) GetComponent.<Animation>().Play("Armature|respirarComZul");
					if(Input.anyKey == false && semZul == true) GetComponent.<Animation>().Play("Armature|respirarSemZul");
					
					
						
					if(Input.GetKey("w") == true)
					{
						if(Input.GetKey("a") == true) transform.rotation.eulerAngles.y = cam.transform.rotation.eulerAngles.y - 45;
						else if(Input.GetKey("d") == true) transform.rotation.eulerAngles.y = cam.transform.rotation.eulerAngles.y + 45;
						else 
						{
							transform.rotation.eulerAngles.y = cam.transform.rotation.eulerAngles.y;
							if(tempoAr > 0.5) transform.Translate(0,0,velMov/2);
							else transform.Translate(0,0,velMov);
							
							if(tempoAr <= 0)
							{
								if(semZul == false)GetComponent.<Animation>().Play("Armature|correndoComZul");
								if(semZul == true)GetComponent.<Animation>().Play("Armature|correndoSemZul");
							}
						}
					}

					if(Input.GetKey("s") == true)
					{
						if(Input.GetKey("a") == true) transform.rotation.eulerAngles.y = cam.transform.rotation.eulerAngles.y - 135;
						else if(Input.GetKey("d") == true) transform.rotation.eulerAngles.y = cam.transform.rotation.eulerAngles.y + 135;
						else 
						{
							transform.rotation.eulerAngles.y = cam.transform.rotation.eulerAngles.y + 180;
							if(tempoAr > 0.5) transform.Translate(0,0,velMov/2);
							else transform.Translate(0,0,velMov);
							
							if(tempoAr <= 0)
							{
								if(semZul == false)GetComponent.<Animation>().Play("Armature|correndoComZul");
								if(semZul == true)GetComponent.<Animation>().Play("Armature|correndoSemZul");
							}
						}
					}

					if(Input.GetKey("a") == true)
					{
						if(Input.GetKey("w") == true) transform.rotation.eulerAngles.y = cam.transform.rotation.eulerAngles.y - 45;
						else if(Input.GetKey("s") == true) transform.rotation.eulerAngles.y = cam.transform.rotation.eulerAngles.y - 135;
						else transform.rotation.eulerAngles.y = cam.transform.rotation.eulerAngles.y - 90;
						if(tempoAr > 0.5) transform.Translate(0,0,velMov/2);
						else transform.Translate(0,0,velMov);
						
						if(tempoAr <= 0)
						{
							if(semZul == false)GetComponent.<Animation>().Play("Armature|correndoComZul");
							if(semZul == true)GetComponent.<Animation>().Play("Armature|correndoSemZul");
						}
						
					}

					if(Input.GetKey("d") == true)
					{
						if(Input.GetKey("w") == true) transform.rotation.eulerAngles.y = cam.transform.rotation.eulerAngles.y + 45;
						else if(Input.GetKey("s") == true) transform.rotation.eulerAngles.y = cam.transform.rotation.eulerAngles.y + 135;
						else transform.rotation.eulerAngles.y = cam.transform.rotation.eulerAngles.y + 90;
						if(tempoAr > 0.5) transform.Translate(0,0,velMov/2);
						else transform.Translate(0,0,velMov);
						
						if(tempoAr <= 0)
						{
							if(semZul == false)GetComponent.<Animation>().Play("Armature|correndoComZul");
							if(semZul == true)GetComponent.<Animation>().Play("Armature|correndoSemZul");
						}
						
					}
					
				}
	
					if(Input.GetKeyDown(KeyCode.Space)) pulou = true;
				if(Input.GetKeyDown(KeyCode.Space) || (pausa > 1 && pausa < 12))
				{
					if(pausa == 0)
					{
						pausa = 2;
						if(Input.GetKey(KeyCode.LeftShift) == true) 
						{
							shiftPress = true;
							anim["Armature|inicioPuloComZul"].speed = 2.3;
						}
						
							if(semZul == false) GetComponent.<Animation>().Play("Armature|inicioPuloComZul");
							else GetComponent.<Animation>().Play("Armature|inicioPuloSemZul");
						
					}
					if(!GetComponent.<Animation>().isPlaying && pausa == 2)
					{
						pausa = 3;
						if(shiftPress == true) anim["Armature|inicioPuloComZul"].speed = 1.0;
					}

					if( (pausa == 4 || pausa == 5) && Input.anyKey == false)transform.Translate(0,velMov*2,0);
					if(pausa == 4 && Input.GetKey("w") == true)
					{
						if(Input.GetKey("a") == true) transform.rotation.eulerAngles.y = cam.transform.rotation.eulerAngles.y - 45;
						else if(Input.GetKey("d") == true) transform.rotation.eulerAngles.y = cam.transform.rotation.eulerAngles.y + 45;
						else 
						{
							transform.rotation.eulerAngles.y = cam.transform.rotation.eulerAngles.y;
							if(shiftPress == true) transform.Translate(0,velMov,velMov*2);
							else transform.Translate(0,velMov*2,velMov);
						}
						
					}

					if(pausa == 4 && Input.GetKey("s") == true)
					{
						if(Input.GetKey("a") == true) transform.rotation.eulerAngles.y = cam.transform.rotation.eulerAngles.y - 135;
						else if(Input.GetKey("d") == true) transform.rotation.eulerAngles.y = cam.transform.rotation.eulerAngles.y + 135;
						else 
						{
							transform.rotation.eulerAngles.y = cam.transform.rotation.eulerAngles.y + 180;
							if(shiftPress == true) transform.Translate(0,velMov,velMov*2);
							else transform.Translate(0,velMov*2,velMov);
						}
					}

					if(pausa == 4 && Input.GetKey("a") == true)
					{
						if(Input.GetKey("w") == true) transform.rotation.eulerAngles.y = cam.transform.rotation.eulerAngles.y - 45;
						else if(Input.GetKey("s") == true) transform.rotation.eulerAngles.y = cam.transform.rotation.eulerAngles.y - 135;
						else transform.rotation.eulerAngles.y = cam.transform.rotation.eulerAngles.y - 90;
						
						if(shiftPress == true) transform.Translate(0,velMov,velMov*2);
						else transform.Translate(0,velMov*2,velMov);
					}

					if(pausa == 4 && Input.GetKey("d") == true)
					{
						if(Input.GetKey("w") == true) transform.rotation.eulerAngles.y = cam.transform.rotation.eulerAngles.y + 45;
						else if(Input.GetKey("s") == true) transform.rotation.eulerAngles.y = cam.transform.rotation.eulerAngles.y + 135;
						else transform.rotation.eulerAngles.y = cam.transform.rotation.eulerAngles.y + 90;
						
						if(shiftPress == true) transform.Translate(0,velMov,velMov*2);
						else transform.Translate(0,velMov*2,velMov);
					}
					
					
					//descida
					if(pausa == 5 && Input.GetKey("w") == true)
					{
						pulou = false;
						if(Input.GetKey("a") == true) transform.rotation.eulerAngles.y = cam.transform.rotation.eulerAngles.y - 45;
						else if(Input.GetKey("d") == true) transform.rotation.eulerAngles.y = cam.transform.rotation.eulerAngles.y + 45;
						else 
						{
							transform.rotation.eulerAngles.y = cam.transform.rotation.eulerAngles.y;
							if(shiftPress == true) transform.Translate(0,velMov,velMov*2);
							else transform.Translate(0,velMov*1.5,velMov*1.5);
							shiftPress = false;
						}
					}

					if(pausa == 5 && Input.GetKey("s") == true)
					{
						pulou = false;
						if(Input.GetKey("a") == true) transform.rotation.eulerAngles.y = cam.transform.rotation.eulerAngles.y - 135;
						else if(Input.GetKey("d") == true) transform.rotation.eulerAngles.y = cam.transform.rotation.eulerAngles.y + 135;
						else 
						{
							transform.rotation.eulerAngles.y = cam.transform.rotation.eulerAngles.y + 180;
							if(shiftPress == true) transform.Translate(0,velMov,velMov*2);
							else transform.Translate(0,velMov*1.5,velMov*1.5);
							shiftPress = false;
						}
					}

					if(pausa == 5 && Input.GetKey("a") == true)
					{
						pulou = false;
						if(Input.GetKey("w") == true) transform.rotation.eulerAngles.y = cam.transform.rotation.eulerAngles.y - 45;
						else if(Input.GetKey("s") == true) transform.rotation.eulerAngles.y = cam.transform.rotation.eulerAngles.y - 135;
						else transform.rotation.eulerAngles.y = cam.transform.rotation.eulerAngles.y - 90;
						
						if(shiftPress == true) transform.Translate(0,velMov,velMov*2);
						else transform.Translate(0,velMov*1.5,velMov*1.5);
						shiftPress = false;
					}

					if(pausa == 5 && Input.GetKey("d") == true)
					{
						pulou = false;
						if(Input.GetKey("w") == true) transform.rotation.eulerAngles.y = cam.transform.rotation.eulerAngles.y + 45;
						else if(Input.GetKey("s") == true) transform.rotation.eulerAngles.y = cam.transform.rotation.eulerAngles.y + 135;
						else transform.rotation.eulerAngles.y = cam.transform.rotation.eulerAngles.y + 90;
						
						if(shiftPress == true) transform.Translate(0,velMov,velMov*2);
						else transform.Translate(0,velMov*1.5,velMov*1.5);
						shiftPress = false;
					}
							
						
				}
			}
			
	/*		
//1 pessoa --------------------------------------------||--------------------------------------||---------------------------------||			
			else
			{
				if(pausa == 0)
				{
					//se não estiver apertando nada executa isso
					if(Input.anyKey == false && semZul == false) GetComponent.<Animation>().Play("Armature|respirarComZul");
					if(Input.anyKey == false && semZul == true) GetComponent.<Animation>().Play("Armature|respirarSemZul");
					
					if(Input.GetKey("w") == true)
					{
							transform.rotation.eulerAngles.y = camfstp.transform.rotation.eulerAngles.y;
							transform.Translate(0,0,velMov);
							
							if(semZul == false)GetComponent.<Animation>().Play("Armature|correndoComZul");
							if(semZul == true)GetComponent.<Animation>().Play("Armature|correndoSemZul");
					}

					if(Input.GetKey("s") == true)
					{
						transform.Translate(0,0,-velMov/2);
					}

					if(Input.GetKey("a") == true)
					{
						
						transform.Translate(-velMov/2,0,0);
						
					}

					if(Input.GetKey("d") == true)
					{
						transform.Translate(velMov/2,0,0);
					}
				}
				
				if(Input.GetKeyDown(KeyCode.Space)) pulou = true;
				if(Input.GetKeyDown(KeyCode.Space) || (pausa > 1 && pausa < 12))
				{
					if(pausa == 0)
					{
						pausa = 2;
						if(Input.GetKey(KeyCode.LeftShift) == true) 
						{
							anim["Armature|inicioPuloComZul"].speed = 2.3;
						}
						
							if(semZul == false) GetComponent.<Animation>().Play("Armature|inicioPuloComZul");
							else GetComponent.<Animation>().Play("Armature|inicioPuloSemZul");
						
					}
					if(!GetComponent.<Animation>().isPlaying && pausa == 2)
					{
						pausa = 3;
						if(shiftPress == true) anim["Armature|inicioPuloComZul"].speed = 1.0;
					}

					if(pausa == 4 && Input.anyKey == false && pulou == true)transform.Translate(0,velMov*2,0);
					if(pausa == 4 && Input.GetKey("w") == true && pulou == true)
					{
						transform.rotation.eulerAngles.y = camfstp.transform.rotation.eulerAngles.y;
						
						if(puzzle == 5) velMov = 6*Time.deltaTime;
							else velMov = 3*Time.deltaTime;
							
						if(shiftPress == true) transform.Translate(0,velMov,velMov*2);
						else transform.Translate(0,velMov*2,velMov);
					}

					if(pausa == 4 && Input.GetKey("s") == true && pulou == true)
					{
						transform.Translate(0,velMov*1.5,-velMov/2);
					}

					if(pausa == 4 && Input.GetKey("a") == true && pulou == true)
					{
						transform.Translate(-velMov/2,velMov*1.5,0);
					}

					if(pausa == 4 && Input.GetKey("d") == true && pulou == true)
					{
						transform.Translate(velMov/2,velMov*1.5,0);
					}
					
					
					if(pausa == 5 && Input.GetKey("w") == true)
					{
						pulou = false;
						transform.rotation.eulerAngles.y = camfstp.transform.rotation.eulerAngles.y;
						if(shiftPress == true) transform.Translate(0,velMov,velMov*2);
						else transform.Translate(0,velMov*2,velMov*1.5);
						shiftPress = false;
					}

					if(pausa == 5 && Input.GetKey("s") == true)
					{
						pulou = false;
						transform.Translate(0,velMov*1.2,-velMov/2);
					}

					if(pausa == 5 && Input.GetKey("a") == true)
					{
						pulou = false;	
						transform.Translate(-velMov/2,velMov*1.2,0);
					}

					if(pausa == 5 && Input.GetKey("d") == true)
					{
						pulou = false;
						transform.Translate(velMov/2,velMov*1.2,0);
					}
				
				}
			
			}
			*/
			
			//se apertar o 1 ele exec a animação de deixar o zul e não deixa fazer nada até o fim dela
			if(Input.GetKey("1") == true && semZul == false || pausa == 14)
			{
				if(pausa == 0)
				{
					pausa = 14;
					GetComponent.<Animation>().Play("Armature|deixaZul");
				}
				if(!GetComponent.<Animation>().isPlaying && pausa == 14)
				{			
					pausa = 0;
					semZul = true;
					zul.SetActive(true);
					zul.transform.position.x = spawnZul.position.x;
					zul.transform.position.y = spawnZul.position.y;
					zul.transform.position.z = spawnZul.position.z;
					GameObject.Find("LookatDoZul").transform.position.y = zul.transform.position.y;
					zul.transform.LookAt(GameObject.Find("LookatDoZul").transform.position);
					zul.transform.rotation.eulerAngles.y = zul.transform.rotation.eulerAngles.y +180;
					 GameObject.Find("Bear").GetComponent(IAZulAsItem).pausa = 0;
					GameObject.Find("Bear").GetComponent(IAZulAsItem).enabled = true;
				}
				
			}
			
			//func para invocar o zul como ajudante
			if(Input.GetKey("2") == true && semZul == false || pausa == 13)
			{
				if(pausa == 0)
				{
					pausa = 13;
					GetComponent.<Animation>().Play("Armature|deixaZul");
				}
				if(!GetComponent.<Animation>().isPlaying && pausa == 13)
				{			
					pausa = 0;
					semZul = true;
					zul.SetActive(true);
					zul.transform.position.x = spawnZul.position.x;
					zul.transform.position.y = spawnZul.position.y;
					zul.transform.position.z = spawnZul.position.z;
					GameObject.Find("Bear").GetComponent(IAZul2).enabled = true;
					iAOn = true;
				}
			}

			if(Input.GetKey("1") == true && semZul == true || pausa == 12)
			{
				if(pausa == 0 && distZul < 1.5)
				{
					pausa = 12;
					GetComponent.<Animation>().Play("Armature|pegaZul");
				}
				if(!GetComponent.<Animation>().isPlaying && pausa == 12) pausa = 0;
				if(pausa == 12)
				{
					semZul = false;
					if(iAOn == false) zul.GetComponent(IAZulAsItem).enabled = false;
					else zul.GetComponent(IAZul2).enabled = false;
					iAOn = false;
					zul.SetActive(false);
				}
				
			}
			
			//"chama" o zul
			if(Input.GetKey("3") == true && semZul == true || pausa == 15)
			{
				zul.transform.position.x = cam.transform.position.x;
				zul.transform.position.y = transform.position.y;
				zul.transform.position.z = cam.transform.position.z;
			}
			print(pausa+"-"+tempoAr+"-"+puzzle+"-"+tempoAr2);
			if(pausa == 3 || (pausa == 0 && (tempoAr > 0.3 || puzzle != 0) && alturaAnt < alturaDep))
			{
				if((pausa == 3 || pausa == 0) && jaRodou == false)
				{
					pausa = 4;
					if(semZul == false) GetComponent.<Animation>().Play("Armature|subidaPuloComZuL");
					else GetComponent.<Animation>().Play("Armature|subidaPuloSemZul");
					
				}
			}
			if( pausa == 4)
			{
				jaRodou = true;
				jaRodou2 = false;
			}
			else if(pausa == 5)
			{
				jaRodou = false;
				jaRodou2 = true;
			}
			else 
			{
				jaRodou = false;
				jaRodou2 = false;
			}
			if(pausa == 4 && alturaAnt > alturaDep && tempoAr2 > 0.4) pausa = 5;
			if(pausa == 5 && tempoAr == 0) pausa = 0;
			if((pausa == 5 || (pausa == 0 && tempoAr > 0.2 && alturaAnt > alturaDep)) && jaRodou2 == false)
			{
				if(semZul == false) GetComponent.<Animation>().Play("Armature|descidaPuloComZuL");
				else GetComponent.<Animation>().Play("Armature|descidaPuloSemZul");
				
			}
			
			if(tempoAr == 0 && pausa == 0 && tempoAr2 > 0.3 || pausa == 16)
			{
				if(pausa == 0)
				{
					pausa = 16;
					if(tempoAr2 > 0.3 && tempoAr2 < 2)
					{
						if(semZul == false) GetComponent.<Animation>().Play("Armature|fimPuloComZul");
						else GetComponent.<Animation>().Play("Armature|fimPuloSemZul");
					}
					else
					{
						jaRodou = false;
						jaRodou2 = false;
						if(semZul == false) GetComponent.<Animation>().Play("Armature|fimPuloComZulQuedaG");
						else GetComponent.<Animation>().Play("Armature|fimPuloSemZulQuedaG");
					}
				}
				if(!GetComponent.<Animation>().isPlaying && pausa == 16) 
				{
					pausa = 0;
					tempoAr2 = 0;
				}

			}
			
		}
	}
}
 
function OnGUI () 
{
	if(pausa == 98)
	{
		if(GUI.Button(Rect(Screen.width/2,Screen.height/2,100,50),"Reiniciar Fase"))
		{
			Application.LoadLevel(Application.loadedLevel);
		}
	}
}

function OnCollisionEnter (collision: Collision)
{
	if(collision.gameObject.tag == "Finish")
	{
		puzzle = 0;
		tempoAr = 0;
		tempoArTrigger = false;
	}
	
	if(collision.gameObject.tag == "pula")
	{
		tempoAr = 0;
		tempoAr2 = 0;
		tempoArTrigger = false;
	}
} 

function OnCollisionExit (collision: Collision)
{
	if(collision.gameObject.tag == "Finish")
	{
		puzzle = 0;
		tempoAr = 0;
		tempoArTrigger = true;		
	}
	
	if(collision.gameObject.tag == "pula")
	{
		if(puzzle < 3) puzzle++;
		tempoAr = 0;
		tempoAr2 = 0;
		tempoArTrigger = true;
		if(GetComponent(Rigidbody).velocity.y > transform.up.y * (3 + puzzle)) GetComponent(Rigidbody).velocity = transform.up * (3 + puzzle);
	}
}