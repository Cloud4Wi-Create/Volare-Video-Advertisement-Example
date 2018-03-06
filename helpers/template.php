<?php
class Template
{
    protected $source;

    public function __construct($source)
    {
        $this->source = $source;
    }

    public function render($values)
    {
        $output = file_get_contents($this->source);

        foreach ($values as $key => $value) {
            $output = str_replace("{{ " . $key . " }}", $value, $output);
        }
        $output = str_replace("\n", "", $output);

        echo $output;
    }
}
