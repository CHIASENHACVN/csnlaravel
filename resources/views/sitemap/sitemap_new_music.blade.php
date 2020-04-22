<?php
use App\Library\Helpers;
echo '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">';
foreach ($musics as $item) {
    echo '<url>
		<loc>' .$item['music_url'] . '</loc>
		<video:video>
			<video:thumbnail_loc>' . $item['cover_html'] . '</video:thumbnail_loc>
			<video:title><![CDATA[' . htmlspecialchars_decode($item['music_title'], ENT_QUOTES) . ' - ' . htmlspecialchars_decode($item['music_artist'], ENT_QUOTES) . ']]></video:title>
			<video:description><![CDATA[' . htmlspecialchars_decode($item['music_shortlyric'], ENT_QUOTES) . ']]></video:description>
		</video:video>
        <lastmod>' . date("Y-m-d\TH:i:s+00:00", $item['music_last_update_time']) . '</lastmod>
	</url>';
}
echo '</urlset>';