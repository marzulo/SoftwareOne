$UrlInsert="https://fe4kj4a372.execute-api.eu-south-1.amazonaws.com/demo/insert"
$UrlQuery="https://fe4kj4a372.execute-api.eu-south-1.amazonaws.com/demo/query"
$UrlDelete="https://fe4kj4a372.execute-api.eu-south-1.amazonaws.com/demo/delete"

$person = @{
    productcode="borse"
    productname="marroni"
	productprice="800"
}
$json = $person | ConvertTo-Json
$response = Invoke-RestMethod -Uri $UrlInsert -Method Post -Body $json -ContentType 'application/json'
echo $response

$person = @{
    productcode="borse"
    productname="verde"
	productprice="1200"
}
$json = $person | ConvertTo-Json
$response = Invoke-RestMethod -Uri $UrlInsert -Method Post -Body $json -ContentType 'application/json'
echo $response

$person = @{
    productcode="borse"
    productname="rosa"
	productprice="400"
}
$json = $person | ConvertTo-Json
$response = Invoke-RestMethod -Uri $UrlInsert -Method Post -Body $json -ContentType 'application/json'
echo $response

$person = @{
    productcode="profume"
    productname="imperatrice"
	productprice="55"
}
$json = $person | ConvertTo-Json
$response = Invoke-RestMethod -Uri $UrlInsert -Method Post -Body $json -ContentType 'application/json'
echo $response

$person = @{
    productcode="profume"
    productname="nuovoprofume"
	productprice="100"
}
$json = $person | ConvertTo-Json
$response = Invoke-RestMethod -Uri $UrlInsert -Method Post -Body $json -ContentType 'application/json'
echo $response

$person = @{
    productcode="profume"
    productname="imperatore"
	productprice="25"
}
$json = $person | ConvertTo-Json
$response = Invoke-RestMethod -Uri $UrlInsert -Method Post -Body $json -ContentType 'application/json'
echo $response
