<!DOCTYPE html>
<html>
@include('mobile.layouts.header')
<body>
@yield('content')
@include('mobile.layouts.footer')
@yield('contentJS')

@hasSection('in_home')
@endif

</body>
<?php
//global $timeStart;
//echo '<center>'.number_format((microtime(true) - $timeStart), 2).'</center>';
?>
</html>
