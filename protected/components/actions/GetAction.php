<?php


class GetAction extends CAction {

	public function run()
	{
		
		$name = $this->getController()->id;
		$id = Yii::app()->request->getParam($name.'Id',false);
		

		if(!$id){
			/**
			 *get all models
			 */
			$models = KmaActiveRecord::model(ucfirst($name))->findAll();
		} else {
			$model = KmaActiveRecord::model(ucfirst($name))->findByPk($id);
		}
		
		if(isset($model)) { 
			$this->getController()->result(array(
				$model->getItemArray()
			));
		} elseif(isset($models)) {

			$res = array_map(function($it){
					return $it->getItemArray();
				}, $models);
			
				$this->getController()->result($res);
		} else {
			$this->getController()->error("Can't load {$name} by Id!");
		}
	}
}