<!DOCTYPE html>
<html lang="ja">
<head>
	<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<ins class="adsbygoogle"
     style="display:block; text-align:center;"
     data-ad-layout="in-article"
     data-ad-format="fluid"
     data-ad-client="ca-pub-8714625808373832"
     data-ad-slot="9543995480"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>
    <meta charset="UTF-8">
    <title>パーソナルカラー</title>
    <link rel="stylesheet" href="makeup.css">
    <script type="module" src="./MakeUpApri.js"></script>
    <!--
    <script type="text/javascript" src="MakeUpApri.js"></script> 
    <script type="text/javascript" src="MakeUpClass.js"></script> 
    -->
	<?php

	$json_grp_array    = json_encode(glob('./img/grp/*'));
	$json_main_array   = json_encode(glob('./img/main/**/*'));
	$json_color_array  = json_encode(glob('./img/color/**/*'));
	?>
	
<!--<meta name="viewport" content="width=device-width,initial-scale=1">-->
<meta name="viewport" content="width=480">
</head>
<body>

<img src="img/base/base_matuge.png" id="base_matuge" alt=""/>
<img src="img/base/base_back.png" id="base_back" alt="" />
<img src="img/base/base_sp_kanae.png" id="base_kanae" alt="" />
<img src="img/base/base_futae.png" id="base_futae" alt="" />
<img src="img/base/base_kutibiru.png" id="base_kutibiru" alt="" />
<img src="img/base/base_kyami.png" id="base_kyami" alt="" />
<img src="img/base/base_mayuge.png" id="base_mayuge" alt="" />
<img src="img/base/base_sobakasu.png" id="base_sobakasu" alt="" />
<img src="img/base/base_shirome.png" id="base_shirome" alt="" />
<img src="img/base/base_tahban.png" id="base_tahban" alt="" />
<img src="img/base/base_eye.png" id="base_eye" alt="" />
<img src="img/base/base_desk.png" id="base_desk" alt="" />
<p id="base_score"></p>
<p id="base_ng">
ファンデーションは◯です。<br>
ヘアスタイルは×です。<br>
アイブロウは×です。<br>
アイシャドウは◯です。<br>
チークは×です。<br>
アイラインは◯です。<br>
マスカラは×です。<br>
リップは×です。<br>
クローゼットは◯です。<br>
次回はもっと高得点を目指して頑張りましょう！<br>
</p>

<img src="img/base/base_dqn.png" id="base_dqn" alt="" />
<!--
<img src="aimg/base/base_again.png" id="base_again" alt="" />
<img src="aimg/base/base_end.png" id="base_end" alt="" />
-->

<a href="#"><img src="img/grp/cheek.png" id="grp_cheek" alt="" /></a>
<a href="#"><img src="img/grp/eyeblow.png" id="grp_eyeblow" alt="" /></a>
<a href="#"><img src="img/grp/eyeliner.png" id="grp_eyeliner" alt="" /></a>
<a href="#"><img src="img/grp/eyeshadow.png" id="grp_eyeshadow" alt="" /></a>
<a href="#"><img src="img/grp/faundetion.png" id="grp_faundetion" alt="" /></a>
<a href="#"><img src="img/grp/hair.png" id="grp_hair" alt="" /></a>
<a href="#"><img src="img/grp/masukara.png" id="grp_masukara" alt="" /></a>
<a href="#"><img src="img/grp/option.png" id="grp_option" alt="" /></a>
<a href="#"><img src="img/grp/rip.png" id="grp_rip" alt="" /></a>
<a href="#"><img src="img/grp/preview.png" id="grp_preview" alt="" /></a>
<a href="#"><img src="img/grp/back.png" id="grp_back" alt="" /></a>
<a href="#"><img src="img/grp/clear.png" id="grp_clear" alt="" /></a>
<a href="#"><img src="img/grp/score.png" id="grp_score" alt="" /></a>

<img src="" id="color_01" alt="" />
<img src="" id="color_02" alt="" />
<img src="" id="color_03" alt="" />
<img src="" id="color_04" alt="" />
<img src="" id="color_05" alt="" />
<img src="" id="color_06" alt="" />
<img src="" id="color_07" alt="" />
<img src="" id="color_08" alt="" />
<img src="" id="color_09" alt="" />
<img src="" id="color_10" alt="" />
<img src="" id="color_11" alt="" />
<img src="" id="color_12" alt="" />
<img src="" id="color_13" alt="" />
<img src="" id="color_14" alt="" />
<img src="" id="color_15" alt="" />
<img src="" id="color_16" alt="" />
<img src="" id="color_17" alt="" />
<img src="" id="color_18" alt="" />
<img src="" id="color_19" alt="" />
<img src="" id="color_20" alt="" />
<img src="" id="color_21" alt="" />
<img src="" id="color_22" alt="" />
<img src="" id="color_23" alt="" />
<img src="" id="color_24" alt="" />
<!--
<img src="img/color/eyesblow/wi_wainred.png" id="color_01" alt="" />
<img src="img/color/eyesblow/sm_pinkgray.png" id="color_02" alt="" />
<img src="img/color/eyesblow/au_darkbrown.png" id="color_03" alt="" />
<img src="img/color/eyesblow/au_green.png" id="color_04" alt="" />
<img src="img/color/eyesblow/wi_blue.png" id="color_05" alt="" />
<img src="img/color/eyesblow/wi_black.png" id="color_06" alt="" />
<img src="img/color/eyesblow/sp_brown.png" id="color_07" alt="" />
<img src="img/color/eyesblow/sp_camel.png" id="color_08" alt="" />
<img src="img/color/eyesblow/sm_gray.png" id="color_09" alt="" />
<img src="img/color/eyesblow/sp_maron.png" id="color_10" alt="" />
<img src="img/color/eyesblow/au_orange.png" id="color_11" alt="" />
<img src="img/color/eyesblow/sm_grejyu.png" id="color_12" alt="" />
<img src="img/color/eyesliner/au_green.png" id="color_01" alt="" />
<img src="img/color/eyesliner/au_red.png" id="color_02" alt="" />
<img src="img/color/eyesliner/sp_brown.png" id="color_03" alt="" />
<img src="img/color/eyesliner/sp_lightbrown.png" id="color_04" alt="" />
<img src="img/color/eyesliner/sm_gray.png" id="color_05" alt="" />
<img src="img/color/eyesliner/sm_nevey.png" id="color_06" alt="" />
<img src="img/color/eyesliner/wi_black.png" id="color_07" alt="" />
<img src="img/color/eyesliner/wi_wain.png" id="color_08" alt="" />-->
<!--
-->


<img src="" id="main_cheek" alt="" />
<img src="" id="main_hair" alt="" />
<img src="" id="main_rip" alt="" />
<img src="" id="main_masukara" alt="" />
<img src="" id="main_eyeshadow" alt="" />
<img src="" id="main_eyeblow" alt="" />
<img src="" id="main_eyeliner" alt="" />
<img src="" id="main_option" alt="" />
<img src="" id="main_faundetion" alt="" />


<?php
echo 'season: ' ;
echo $_POST["seasons"];
?>

</body>
</html>

<script>
window.season = "<?php echo $_POST["seasons"]; ?>";
let js_grp_array   = JSON.parse('<?php echo $json_grp_array ?>');
let js_main_array  = JSON.parse('<?php echo $json_main_array ?>');
let js_color_array = JSON.parse('<?php echo $json_color_array ?>');
//console.log('test');
console.log(js_grp_array);
console.log(js_color_array);
console.log(js_main_array);
console.log(window.season);


//let makeup = new MakeUpClass(js_grp_array,  js_color_array, js_main_array, document);


</script>
