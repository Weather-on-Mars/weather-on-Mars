<?php  
/** 
 * Created by PhpStorm. 
 * User: Ada Jacques
 * Date: 5/10/2022 
 * Time: 11:55 PM 
 */  
include("database/db_connection.php");  
$delete_id=$_GET['del'];  
$delete_query="delete  from mars_app WHERE id='$delete_id'";//delete query  
$run=mysqli_query($dbcon,$delete_query);  
if($run)  
{  
//javascript function to open in the same window   
    echo "<script>window.open('view_users.php?deleted=user has been deleted','_self')</script>";  
}  
  
?>  