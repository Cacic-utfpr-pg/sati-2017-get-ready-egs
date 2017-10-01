function Start () 
{	
	
}
 var alvo :IAZul;
 
function Update () 
{
	
}

function OnCollisionEnter (collision: Collision)
{
	alvo.vaiCair = true;
} 

function OnCollisionExit (collisionInfo: Collision)
{
	alvo.vaiCair = false;
}