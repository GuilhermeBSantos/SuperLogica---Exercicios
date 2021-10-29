<?php
    //1) Crie um array
    $array = array();
    //2) Popule este array com 7 números
    while(count($array) < 7){
        array_push($array, rand(0, 14));
    }

    //3) Imprima o número da posição 3 do array
    echo $array[3];
    echo "<br/>";

    //4) Crie uma variável com todas as posições do array no formato de string separado por vírgula
    $string_array = '';
    foreach($array as $arr){
        $string_array .= $arr.',';
    }

    //5) Crie um novo array a partir da variável no formato de string que foi criada e destrua o array anterior
    $new_array = explode(',', $string_array);
    array_pop($new_array);
    $array = NULL;

    //6) Crie uma condição para verificar se existe o valor 14 no array
    if(in_array("14" ,$new_array )){
        echo "Existe o valor 14 <br/>";
    }
    else{
        echo "Não Existe o valor 14 <br/>";
    }
    
    //6) Crie uma condição para verificar se existe o valor 14 no array

    echo "<br/>";
    echo ($new_array);
?>