var target : GameObject;
var oliver : GameObject;
var osso : GameObject;
var cam : GameObject;
 
var xSpeed = 250.0;
var ySpeed = 120.0;
 
var yMinLimi = -50;
var yMaxLimi = 70;
var olhaOliver : GameObject;
var xMinLimit = -50;
var xMaxLimit = 70;
private var x = 0.0;
private var y = 0.0;
 
private var startPos : Vector3;
private var startRot;
private var distance;
private var canMove : boolean = true;
 
@script AddComponentMenu("Camera-Control/Mouse Orbit")
 
function Start () 
{
    var angles = transform.eulerAngles;
    x = angles.y;
    y = angles.x;
    distance = 0.03;
    // Make the rigid body not change rotation
    if (GetComponent.<Rigidbody>())
       GetComponent.<Rigidbody>().freezeRotation = true;
 
    startPos = this.transform.position;
    startRot = this.transform.rotation;
    
}
 function Update()
 {
	if(oliver.GetComponent(movimentacao).vida <= 0)
	{
		//transform.parent = someTransform.parent;
		transform.position.x = osso.transform.position.x;
		transform.position.y = osso.transform.position.y+0.1;
		transform.position.z = osso.transform.position.z;
		
		transform.rotation.x = osso.transform.rotation.x;
		transform.rotation.y = osso.transform.rotation.y;
		transform.rotation.z = osso.transform.rotation.z;
		//tentando deixar realista
		GetComponent(Camera).fieldOfView = 30;
		
	}
	else
	{	
		 olhaOliver.transform.position.y = oliver.transform.position.y+2;
		 oliver.transform.LookAt(Vector3(olhaOliver.transform.position.x, oliver.transform.position.y, olhaOliver.transform.position.z));
	}
 }
function LateUpdate () 
{
	
	if(GetComponent(PauseMenu).pauseEnabled == false)
	{
		if (canMove)
		{
		   if (target.transform) 
		   {
			   if (Input.GetAxis("Mouse ScrollWheel") != 0f ) // forward
				{
					distance -= Input.GetAxis("Mouse ScrollWheel");
					if(distance < 0.03) distance = 0.03;
					if(distance > 0.03)
					{
						cam.SetActive(true);
						gameObject.SetActive(false);
						cam.GetComponent(AudioListener).enabled = true;
						GetComponent(AudioListener).enabled = false;
						oliver.GetComponent(movimentacao).fstAtivo = false;
						
					}
				}
			   if(oliver.GetComponent(movimentacao).vida <= 0);
			   else
			   {
					x += Input.GetAxis("Mouse X") * xSpeed * 0.006;
					y -= Input.GetAxis("Mouse Y") * ySpeed * 0.01;
					
					y = ClampAngle(y,yMinLimi,yMaxLimi);
					
					
					
					var rotation = Quaternion.Euler(y, x, 0);
					var position = rotation * Vector3(0.0, 0.0, distance) + target.transform.position;
		 
					transform.rotation = rotation;
					transform.position = position;
			   }
			}
		}
	}
}
 
static function ClampAngle (angle : float, min : float, max : float) 
{
    if (angle < -360)
	{
       angle += 360;
	}
    if (angle > 360)
	{
       angle -= 360;
	}
    return Mathf.Clamp (angle, min, max);
}
 
function Restart()
{
    canMove = false;
    this.transform.position = startPos;
    transform.rotation = startRot;
    canMove = true;
}