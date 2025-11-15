<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithCustomCsvSettings;
use Maatwebsite\Excel\Concerns\WithMultipleSheets;
use Maatwebsite\Excel\Concerns\WithTitle;

class TimesExport implements WithMultipleSheets
{
    protected $data;
    protected $nome_time;
    public function __construct($data, $nome_time)
    {
        $this->data = $data;
        $this->nome_time = $nome_time;
    }

    public function sheets(): array
    {
        $sheets[] = new TimeSheet($this->nome_time, $this->data);
        return $sheets;
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
                $jogador->usuario->nome,
                $jogador->usuario->email,
                $jogador->usuario->ra,
                $jogador->status == "0" ? "Pendente" : ($jogador->status == "1" ? "Ativo" : "Negado"),
            ];
        }
        return $data;
    }
}