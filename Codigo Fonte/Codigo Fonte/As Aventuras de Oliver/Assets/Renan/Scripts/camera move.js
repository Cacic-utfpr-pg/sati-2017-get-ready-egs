var target : GameObject;
var camfstp : GameObject;
var distance = 3.0;
 
var xSpeed = 250.0;
var ySpeed = 120.0;
 
var yMinLimit = -15;
var yMaxLimit = 80;
 
private var x = 0.0;
private var y = 0.0;
 
private var startPos : Vector3;
private var startRot;
private var canMove : boolean = true;
 
@script AddComponentMenu("Camera-Control/Mouse Orbit")
 
function Start () 
{
    var angles = transform.eulerAngles;
    x = angles.y;
    y = angles.x;
    
    // Make the rigid body not change rotation
    if (GetComponent.<Rigidbody>())
       GetComponent.<Rigidbody>().freezeRotation = true;
 
    startPos = this.transform.position;
    startRot = this.transform.rotation;
    
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
					if(distance > 7) distance = 7;
					if(distance < 1) distance = 1;
					
				}
			   if(target.GetComponent(movimentacao).vida <= 0) distance = 1.5;
				x += Input.GetAxis("Mouse X") * xSpeed * 0.02;
				y -= Input.GetAxis("Mouse Y") * ySpeed * 0.02;

			y = ClampAngle(y, yMinLimit, yMaxLimit);

				var rotation = Quaternion.Euler(y, x, 0);
				var position = rotation * Vector3(0.0, 0.0, -distance) + Vector3(target.transform.position.x, target.transform.position.y + 1, target.transform.position.z);

				transform.rotation = rotation;
				transform.position = position;
			}
		}
	}
}
 
static function ClampAngle (angle : float, min : float, max : float) 
{
    if (angle < -360)
       angle += 360;
    if (angle > 360)
       angle -= 360;
    return Mathf.Clamp (angle, min, max);
}
 
function Restart()
{
    canMove = false;
    this.transform.position = startPos;
    transform.rotation = startRot;
    canMove = true;
}

