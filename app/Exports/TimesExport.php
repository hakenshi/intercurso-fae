<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithCustomCsvSettings;
use Maatwebsite\Excel\Concerns\WithMultipleSheets;
use Maatwebsite\Excel\Concerns\WithTitle;

class TimesExport implements WithMultipleSheets, WithCustomCsvSettings
{
    protected $data;

    public function __construct($data)
    {
        $this->data = $data;
    }

    public function sheets(): array
    {
        $sheets[] = new TimeSheet($this->data['nome'], $this->data['jogadores']);
        return $sheets;
    }

    public function getCsvSettings(): array
    {
        return [
          'delimiter' => ';'
        ];
    }
}

class TimeSheet implements FromArray, WithTitle
{
    protected $title;
    protected $info;

    public function __construct($title, $info)
    {
        $this->title = $title;
        $this->info = $info;

    }

    public function title(): string
    {
        return $this->title ?? "Sem Título";
    }

    public function array(): array
    {
        $data = [];
        $data[] = ['Time', 'Nome dos Usuários', 'Email', 'RA', 'Status'];
        foreach ($this->info as $jogador) {
            $data[] = [
                $this->title,
                $jogador['nome'],
                $jogador['email'],
                $jogador['ra'],
                $jogador['status'],
            ];
        }
        return $data;
    }
}