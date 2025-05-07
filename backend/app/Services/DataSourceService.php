
<?php

namespace App\Services;

use App\Models\DataSource;
use Illuminate\Support\Facades\Auth;

class DataSourceService
{
    public function getAllDataSources()
    {
        return DataSource::where('tenant_id', Auth::user()->tenant_id)
            ->orderBy('created_at', 'desc')
            ->get();
    }

    public function getDataSourceById($id)
    {
        return DataSource::where('tenant_id', Auth::user()->tenant_id)
            ->findOrFail($id);
    }

    public function createDataSource(array $data)
    {
        $data['tenant_id'] = Auth::user()->tenant_id;
        return DataSource::create($data);
    }

    public function updateDataSource($id, array $data)
    {
        $dataSource = $this->getDataSourceById($id);
        $dataSource->update($data);
        return $dataSource;
    }

    public function deleteDataSource($id)
    {
        $dataSource = $this->getDataSourceById($id);
        return $dataSource->delete();
    }
}
