const AWS = require('aws-sdk');

module.exports = class EC2 {
    constructor(instance) {
        this.amiLaunchIndex = instance.AmiLaunchIndex
        this.imageId = instance.ImageId
        this.instanceId = instance.InstanceId
        this.instanceType = instance.InstanceType
        this.keyName = instance.KeyName
        this.launchTime = instance.LaunchTime
        this.monitoring = instance.Monitoring
        this.placement = instance.Placement
        this.privateDnsName = instance.PrivateDnsName
        this.privateIpAddress = instance.PrivateIpAddress
        this.productCodes = instance.ProductCodes
        this.publicDnsName = instance.PublicDnsName
        this.state = instance.State
        this.stateTransitionReason = instance.StateTransitionReason
        this.subnetId = instance.SubnetId
        this.vpcId = instance.VpcId
        this.architecture = instance.Architecture
        this.blockDeviceMappings = instance.BlockDeviceMappings
        this.clientToken = instance.ClientToken
        this.ebsOptimized = instance.EbsOptimized
        this.enaSupport = instance.EnaSupport
        this.hypervisor = instance.Hypervisor
        this.iamInstanceProfile = instance.IamInstanceProfile
        this.elasticGpuAssociations = instance.ElasticGpuAssociations
        this.elasticInferenceAcceleratorAssociations = instance.ElasticInferenceAcceleratorAssociations
        this.networkInterfaces = instance.NetworkInterfaces
        this.rootDeviceName = instance.RootDeviceName
        this.rootDeviceType = instance.RootDeviceType
        this.securityGroups = instance.SecurityGroups
        this.sourceDestCheck = instance.SourceDestCheck
        this.tags = instance.Tags
        this.virtualizationType = instance.VirtualizationType
        this.cpuOptions = instance.CpuOptions
        this.capacityReservationSpecification = instance.CapacityReservationSpecification
        this.hibernationOptions = instance.HibernationOptions
        this.licenses = instance.Licenses
    }    
};
