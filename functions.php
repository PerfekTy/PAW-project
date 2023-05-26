$data = $request->validated();

$FirstName = $data['FirstName'];
$LastName = $data['LastName'];
$E_mail = $data['E_mail'];
$Password = bcrypt($data['Password']);

$data = array('name'=>$FirstName,"email"=>$E_mail,"password"=>$Password);

DB::table('users')->insert($data);
echo "Record inserted successfully.<br />";