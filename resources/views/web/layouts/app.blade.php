<?php
use App\Library\Helpers;
global $allpage_banner;
global $sb_banner;
global $memberVip;

$allpage_banner = false; //( rand(1,100) > 50 ) ? true : false;
$sb_banner = false;
if($memberVip == null)
    $memberVip = Helpers::checkMemberVip();
?>

<!DOCTYPE html>
<html>
@include('web.layouts.header')
<body>

@hasSection('no_ads')
@else
    @if(!$memberVip)
        <!--  Yo verify campaign 16/8/2019 -->
        <script type="text/javascript" async defer src="//ss.yomedia.vn/js/1/230/ads.js"></script>
        <!--  BSD-Xaxis verify campaign 13/8/2020 -->
        <img src="//vn-gmtdmp.mookie1.com/t/v2/learn?tagid=V2_35893&src.rand=[timestamp]" style="display:none;"/>
    @endif
@endif

{{--@if( isset($allpage_banner) && $allpage_banner == true )
    <a target="_blank"
       href="https://clicktrackingv2.userreport.com/?BLV5a6cbb86;https://yame.vn/shop/ao-thun?s=2&utm_source=background_CSN&utm_medium=CPD">
        <div style="text-align: center; height: 150px; position: relative; background-color: #e8ce79; background-repeat: no-repeat; background-position: center; z-index: -1;">
            <div class="atag" style="position: absolute; top: 0px; left: 0; right: 0; z-index: 0;">
                <img src="https://data.chiasenhac.com/banner/yame2/Top_2.jpg" border="0" width="1000" height="150"/>
            </div>
            <img src="https://visitanalytics.userreport.com/hit.gif?t=BLV5a6cbb86">
        </div>
    </a>
@endif--}}

<div id="fb-root"></div>
<section class="wrapper_content">
@include('web.layouts.wapper')

@hasSection('hidden_wapper')
@endif


    @hasSection('in_home')
    @else
    @endif

@hasSection('no_ads')
@else
        @if(!$memberVip)
            @hasSection('in_player')
                    <div class="ads_box" id="pc_masthead">
                        <div class="container text-center">
                            <div id="bsmasthead-wrapper">
                            {{--                                @if(View::exists('cache.code_ads.pc_masthead_player'))--}}
                            @if( isset($allpage_banner) && $allpage_banner == true )
                                <!-- Ad Tag-980x250 for Publisher chiasenhac - LAVA DIGITAL-->
                                    <script src='https://pub.lavanetwork.net/sites/chiasenhac/chiasenhac_masthead.js'></script>
                                @else
                                    @include('cache.code_ads.pc_masthead_player')
                                    {{--@endif--}}
                                @endif
                            </div>
                        </div>
                    </div>

                @if ( rand(1,100) > 0 )
                @else
                    <div class="ads_box" id="pc_masthead_bg">
                        <div class="container text-center">
                            <div id="bsmasthead-wrapper">
                                <!-- Ad Tag-980x250 for Publisher chiasenhac - LAVA DIGITAL-->
                                <script src='https://pub.lavanetwork.net/sites/chiasenhac/chiasenhac_masthead.js'></script>
                            </div>
                        </div>
                    </div>
                    <?php $sb_banner = true; ?>
                @endif
            @else
                <div class="ads_box" id="pc_masthead">
                    <div class="container text-center">
                        <div id="bsmasthead-wrapper">
{{--                            @if(View::exists('cache.code_ads.pc_masthead_home'))--}}
                                @include('cache.code_ads.pc_masthead_home')
                            {{--@endif--}}
                        </div>
                    </div>
                </div>

            @endif
        @endif
@endif

@yield('content')

@include('web.layouts.footer')
</section>
@yield('contentJS')

@hasSection('no_ads')
@else
    @if(!$memberVip)
        @hasSection('in_player')
{{--            @if(View::exists('cache.code_ads.pc_ballon_player'))--}}
                @include('cache.code_ads.pc_ballon_player')
            {{--@endif--}}
        @else
{{--            @if(View::exists('cache.code_ads.pc_ballon_home'))--}}
                @include('cache.code_ads.pc_ballon_home')
            {{--@endif--}}
        @endif

        @hasSection('in_home')
        @else
            <?php
            $cookie_name = "csn_popup_pc";
            $session_ads_popup = isset($_COOKIE[$cookie_name]) ? intval(unserialize(stripslashes($_COOKIE[$cookie_name]))) : 0;
            if ($session_ads_popup < 1) {
                @setcookie($cookie_name, serialize($session_ads_popup + 1), time() + 30, '/', '.chiasenhac.vn', 1);

                // Blueseed - Mobile In flow - Popup // backup code Ambient
                //echo '<!-- BlueSeed - asynchronous code for placement 1883 Chiasenhac InFlow Desktop -->
                //<script id="jshd1pm_1883" src="https://d2.blueseed.tv/ads-sync.js?placement=1883"></script>';
            }
            ?>
        @endif

        <?php
        $cookie_name = "csn_popup_pc";
        $session_ads_popup = isset($_COOKIE[$cookie_name]) ? intval(unserialize(stripslashes($_COOKIE[$cookie_name]))) : 0;
        ?>
        @if ( $session_ads_popup < 1 )
            <?php
            @setcookie($cookie_name, serialize($session_ads_popup + 1), time() + 10, '/', '.chiasenhac.vn', 1);
            ?>
            @include('cache.code_ads.pc_popup');
            {{--include(__DIR__.'../../../resources/views/cache/code_ads/mobile_popup.blade.php');--}}
        @endif

    @endif
@endif


</body>
</html>
