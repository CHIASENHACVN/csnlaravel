<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
        Commands\SolrCover::class,

        Commands\Album::class,
        Commands\AlbumCat::class,
        Commands\BxhCategory::class,
        Commands\MusicDownload::class,
        Commands\SuggestionCat::class,
        Commands\SolrCover::class,
    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        // $schedule->command('inspire')
        //          ->hourly();
//        $schedule->call('\App\Http\Controllers\Sync\SolrSyncController@syncVideo');

        $schedule->command('album');
        $schedule->command('album_cat');
        $schedule->command('music_download');
        $schedule->command('suggestion_cat');


        $schedule->command('bxh_cat:type cat today');  // bảng xếp hạng hôm nay
        $schedule->command('bxh_cat:type cat week');   // bảng xếp hạng trong tuần
        $schedule->command('bxh_cat:type cat_month 1 2019');  // bảng xếp hạng tháng trong năm, (all sẽ lấy tất cả)
        $schedule->command('bxh_cat:type cat_month all 2019');   // bảng xếp hạng của năm


//        $schedule->command('solr:type music'); // đồng bộ search solr nhạc
//        $schedule->command('solr:type video'); // đồng bộ search solr video
//        $schedule->command('solr:type artist'); // đồng bộ search solr ca sĩ
//        $schedule->command('solr:type cover'); // đồng bộ search solr album

    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__.'/Commands');
        require base_path('routes/console.php');
    }
}
