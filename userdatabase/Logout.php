<?php  
/** 
 * Created by PhpStorm. 
 * User: Ada Jacques
 * Date: 05/10/2022 
 * Time: 4:04 PM 
 */  
  
session_start();//session is a way to store information (in variables) to be used across multiple pages.  
session_destroy();  
header("Location: login.php");//use for the redirection to some page  
?>  